alter table public.transparency_documents
drop constraint if exists transparency_documents_category_check;

update public.transparency_documents
set category = 'Atas de eleição'
where category = 'CNPJ e documentos institucionais';

alter table public.transparency_documents
add constraint transparency_documents_category_check
check (
  category in (
    'Estrutura Organizacional',
    'Estatuto',
    'Atas de eleição',
    'Projetos aprovados',
    'Relatórios',
    'Certidões',
    'Balanço Patrimonial',
    'Prestação de contas',
    'Outros documentos'
  )
);
