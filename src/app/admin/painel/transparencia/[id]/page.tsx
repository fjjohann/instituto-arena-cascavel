import { notFound } from "next/navigation";
import { AdminBackLink, AdminPageHeader } from "@/components/admin-form";
import { AdminDocumentForm } from "@/components/admin-document-form";
import { requireAdmin } from "@/lib/admin";
import type { TransparencyDocument } from "@/lib/supabase/types";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("transparency_documents").select("*").eq("id", id).single();
  if (!data) notFound();

  const document = data as TransparencyDocument;

  return (
    <section className="bg-paper py-14">
      <div className="container">
        <AdminPageHeader eyebrow="Admin" title={`Editar documento: ${document.title}`}>
          <AdminBackLink href="/admin/painel/transparencia" />
        </AdminPageHeader>
        <AdminDocumentForm document={document} />
      </div>
    </section>
  );
}
