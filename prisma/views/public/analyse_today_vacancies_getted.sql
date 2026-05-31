SELECT
  CASE
    ai.paridade
    WHEN 1 THEN 'pessimo  🟥' :: text
    WHEN 2 THEN 'ruim     🟨' :: text
    WHEN 3 THEN 'bom      🟦' :: text
    WHEN 4 THEN 'perfeito 🟩' :: text
    WHEN 0 THEN 'outros    ⬛' :: text
    ELSE 'TOTAL ' :: text
  END AS paridade,
  count(ai.id) AS qtd
FROM
  (
    vagas
    JOIN ai_analysis ai ON ((ai.id = vagas.ai_analysis_fk))
  )
WHERE
  (vagas.dt_register = CURRENT_DATE)
GROUP BY
  ROLLUP(ai.paridade);