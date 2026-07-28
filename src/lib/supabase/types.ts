export type ProjectStatus = "em captação" | "aprovado" | "em execução" | "concluído";

export type Project = {
  id: string;
  official_name: string;
  slug: string;
  status: ProjectStatus;
  short_summary: string | null;
  full_description: string | null;
  objective: string | null;
  target_audience: string | null;
  approved_amount: number | null;
  amount_to_raise: number | null;
  law_approval_body: string | null;
  execution_period: string | null;
  cover_image_url: string | null;
  gallery_image_urls: string[] | null;
  sponsor_information: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type TransparencyDocument = {
  id: string;
  title: string;
  category: string;
  publication_date: string;
  description: string | null;
  pdf_url: string;
  active: boolean;
};

export type Partner = {
  id: string;
  name: string;
  logo_url: string | null;
  category: string | null;
  website_url: string | null;
  description: string | null;
  active: boolean;
  display_order: number;
};

export type InstituteAction = {
  id: string;
  title: string;
  action_date: string;
  description: string | null;
  cover_image_url: string | null;
  gallery_image_urls: string[] | null;
  video_url: string | null;
  active: boolean;
};
