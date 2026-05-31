WITH date_tab AS (
  SELECT
    vagas.id,
    vagas.last_disp_analysis AS full_date,
    (CURRENT_DATE - vagas.last_disp_analysis) AS days,
    ((CURRENT_DATE - vagas.last_disp_analysis) / 7) AS weeks
  FROM
    vagas
),
date_formated AS (
  SELECT
    date_tab.id,
    CASE
      WHEN (date_tab.weeks = 1) THEN (date_tab.weeks || ' semana' :: text)
      WHEN (date_tab.weeks > 1) THEN (date_tab.weeks || ' semanas' :: text)
      ELSE CASE
        WHEN (date_tab.days = 0) THEN 'hoje' :: text
        WHEN (date_tab.days = 1) THEN (date_tab.days || ' ontem' :: text)
        WHEN (date_tab.days > 1) THEN (date_tab.days || ' dias' :: text)
        ELSE 'ERRORRRRRR' :: text
      END
    END AS last_disp_analys
  FROM
    date_tab
)
SELECT
  date_formated.id,
  date_formated.last_disp_analys
FROM
  date_formated;