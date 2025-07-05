"use client"
import { useEffect,useState } from "react"
import { Sidebar } from "@/components/components/sidebar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SquarePen, Trash } from "lucide-react"
import { supabase } from "@/lib/supabase"

type Post = {
  id: number
  name: string
  content: string
  timestamp: number
}

export default function Home() {
  const [name] = useState("Reinier Mariscotes")
  const [content, setContent] = useState("")
  const [posts, setPosts] = useState<Post[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editContent, setEditContent] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)


  useEffect(() => {
  async function fetchPosts() {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching posts:", error)
    } else {
      setPosts(data as Post[])
    }
  }
    fetchPosts()
}, [])



  const handleShare = async () => {
  if (!content.trim() || content.length > 280) return

  const { data, error } = await supabase.from("posts").insert([
    { name, content }
  ])

  if (error) {
    console.error("Failed to post:", error.message, error.details, error.hint)
  } else {
    setContent("")
    const { data: updated } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })

    setPosts(updated as Post[])
  }
}
  const handleDelete = async (id: number) => {
  const { error } = await supabase.from("posts").delete().eq("id", id)

  if (error) {
    console.error("Delete failed:", error)
  } else {
    setPosts(posts.filter(p => p.id !== id))
  }
}

  const handleEdit = (id: number, originalContent: string) => {
    setEditingId(id)
    setEditContent(originalContent)
  }

  const handleSaveEdit = async () => {
  if (!editContent.trim() || editContent.length > 280 || editingId === null) return

  const { error } = await supabase
    .from("posts")
    .update({ content: editContent })
    .eq("id", editingId)

  if (error) {
    console.error("Edit failed:", error)
    return
  }

  // Update UI
  const updatedPosts = posts.map(post =>
    post.id === editingId ? { ...post, content: editContent } : post
  )

  setPosts(updatedPosts)
  setEditingId(null)
  setEditContent("")
}




  return (
    <main className="flex bg-white text-black min-h-screen font-sans">
      <Sidebar />

      <section className="flex-1 p-6 space-y-4">
        {/* Top Nav */}
        <div className="flex justify-between items-center bg-[#3b5998] text-white px-6 py-3 shadow-md">
          <h1 className="text-2xl font-bold tracking-wide">Reinier Mariscotes</h1>
          <nav className="space-x-4 text-sm font-medium">
            <Button className="bg-white text-[#3b5998] px-3 py-1 rounded shadow hover:bg-gray-100" variant="outline">
              Wall
            </Button>
            <Button className="hover:underline hover:text-gray-200 transition duration-150" variant="ghost">
              Info
            </Button>
            <Button className="hover:underline hover:text-gray-200 transition duration-150" variant="ghost">
              Photos
            </Button>
            <Button className="hover:underline hover:text-gray-200 transition duration-150" variant="ghost">
              Notes
            </Button>
            <Button className="hover:underline hover:text-gray-200 transition duration-150" variant="ghost">
              Boxes
            </Button>
          </nav>
        </div>

        {/* Status Box */}
        <Card>
          <CardContent className="p-4 space-y-2">
            <Input
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={280}
            />
            
            
            <div className="flex justify-between text-sm text-gray-500">
              <span>Friends and Networks ▼</span>
              <Button onClick={handleShare} size="sm">Share</Button>
            </div>
          </CardContent>
        </Card>

        {/* Live Feed */}
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-4 space-y-2">
              <p><strong>{post.name}</strong></p>

              {editingId === post.id ? (
                <div className="space-y-2">
                  <Input
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    maxLength={280}
                  />
                  <div className="flex justify-end space-x-2">
                    <Button size="sm" onClick={handleSaveEdit}>Save</Button>
                    <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <p>{post.content}</p>
                  <div className=" flex justify-between space-x-2 text-sm">
                 <SquarePen
    size={30} // Makes icon small
    className="text-blue-600 cursor-pointer hover:text-blue-800 transition"
    onClick={() => handleEdit(post.id, post.content)}
  />
  <Trash
    size={30}
    className="text-red-600 cursor-pointer hover:text-red-800 transition"
    onClick={() => handleDelete(post.id)}
  />
 
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}


       
      </section>
    </main>
  )
}