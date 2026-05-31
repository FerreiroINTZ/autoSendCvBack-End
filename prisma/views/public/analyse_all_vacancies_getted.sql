SELECT
  CASE
    WHEN (ai.paridade = 4) THEN 'perfeitos 🟩' :: text
    WHEN (ai.paridade = 3) THEN 'bons      🟦' :: text
    WHEN (ai.paridade = 2) THEN 'ruins     🟨' :: text
    WHEN (ai.paridade = 1) THEN 'pessimos  🟥' :: text
    WHEN (ai.paridade = 0) THEN 'outros    ⬛' :: text
    ELSE 'TOTAL' :: text
  END AS "case",
  count(ai.paridade) AS count
FROM
  (
    vagas
    JOIN ai_analysis ai ON ((ai.id = vagas.ai_analysis_fk))
  )
GROUP BY
  ROLLUP(ai.paridade);