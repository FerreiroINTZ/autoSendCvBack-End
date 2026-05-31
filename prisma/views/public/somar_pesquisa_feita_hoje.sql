SELECT
  COALESCE((ai.paridade) :: text, 'TOTAL' :: text) AS "coalesce",
  count(ai.paridade) AS count,
  sum(ai.paridade) AS sum
FROM
  (
    vagas
    JOIN ai_analysis ai ON ((ai.id = vagas.ai_analysis_fk))
  )
WHERE
  (vagas.dt_register = CURRENT_DATE)
GROUP BY
  ROLLUP(ai.paridade)
ORDER BY
  ai.paridade;