SELECT
  vg.id,
  vg.area,
  vg.link,
  vg.empresa,
  vg.titulo,
  vg.plataforma,
  to_char(
    (vg.dt_publicacao) :: timestamp WITH time zone,
    'DD/MM/YYYY' :: text
  ) AS dt_publicacao,
  vg.disponibilidade,
  vg.acesso,
  date_formated.last_disp_analys,
  fs.salario,
  ai.paridade,
  ai.matches,
  ai.summary,
  ai.weaknesses,
  ai.justificativa
FROM
  (
    (
      (
        vagas vg
        JOIN get_last_disp_analysis_formated date_formated ON ((date_formated.id = vg.id))
      )
      JOIN ai_analysis ai ON ((ai.id = vg.ai_analysis_fk))
    )
    JOIN format_salario fs ON ((fs.id = vg.id))
  );