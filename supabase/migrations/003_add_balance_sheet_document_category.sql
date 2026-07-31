alter table public.transparency_documents
drop constraint if exists transparency_documents_category_check;

alter table public.transparency_documents
add constraint transparency_documents_category_check
check (
  category in (
    'Estatuto',
    'CNPJ e documentos institucionais',
    'Projetos aprovados',
    'Relatórios',
    'Certidões',
    'Balanço Patrimonial',
    'Prestação de contas',
    'Outros documentos'
  )
);
