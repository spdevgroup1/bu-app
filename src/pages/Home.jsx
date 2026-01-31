import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Database } from "lucide-react";

export default function Home() {
  const [open, setOpen] = useState(false);

  const { data: contacts, isLoading } = useQuery({
    queryKey: ['contacts'],
    queryFn: () => base44.entities.Contact.list(),
    initialData: [],
  });
  return (
    <div className="min-h-screen bg-blue-700 flex items-center justify-center relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900" />
      
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center"
      >
        <motion.h1
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[12rem] sm:text-[16rem] md:text-[20rem] lg:text-[28rem] font-black text-white tracking-tighter leading-none select-none"
          style={{
            textShadow: "0 20px 60px rgba(0,0,0,0.3)",
            fontFamily: "Inter, system-ui, sans-serif"
          }}
        >
          BU
        </motion.h1>
        
        {/* Subtle underline accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="h-2 bg-white/30 rounded-full mx-auto mt-4"
          style={{ width: "40%" }}
        />

        {/* Database Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12"
        >
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button 
                size="lg"
                className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8 py-6 text-lg shadow-2xl"
              >
                <Database className="w-5 h-5 mr-2" />
                View Contacts
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl">Contact Database</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                {isLoading ? (
                  <div className="text-center py-8 text-gray-500">Loading...</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contacts.map((contact) => (
                        <TableRow key={contact.id}>
                          <TableCell className="font-medium">{contact.name}</TableCell>
                          <TableCell>{contact.email}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>
      </motion.div>
    </div>
  );
}