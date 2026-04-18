'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'
import { motion } from 'framer-motion'

interface SearchBarProps {
  placeholder?: string
}

export default function SearchBar({ placeholder }: SearchBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/?q=${encodeURIComponent(query.trim())}`)
    } else {
      router.push('/')
    }
  }

  return (
    <motion.form 
      onSubmit={handleSearch}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="w-full max-w-3xl p-2 bg-surface/80 backdrop-blur-xl border border-border shadow-2xl rounded-2xl md:rounded-3xl flex flex-col md:flex-row gap-2 focus-within:ring-2 ring-primary/20 transition-all"
    >
      <div className="flex-1 flex items-center px-4">
        <Search className="w-5 h-5 text-foreground/40 mr-2" />
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder || "Qual tipo de evento você busca?"}
          className="w-full py-4 bg-transparent outline-none text-lg placeholder:text-foreground/30"
        />
      </div>
      <button 
        type="submit"
        className="bg-primary text-white px-8 py-4 rounded-xl md:rounded-2xl font-bold transition-all hover:brightness-110 hover:shadow-lg hover:shadow-primary/20 active:scale-95 whitespace-nowrap"
      >
        Buscar Eventos
      </button>
    </motion.form>
  )
}
