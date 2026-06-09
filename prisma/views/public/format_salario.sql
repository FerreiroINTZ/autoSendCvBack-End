WITH words AS (
  SELECT
    'nao expecificado' :: text AS salario_vazio
)
SELECT
  vagas.id,
  CASE
    WHEN (vagas.salario IS NULL) THEN (wd.salario_vazio) :: character varying
    WHEN ((vagas.salario) :: text = '0' :: text) THEN (wd.salario_vazio) :: character varying
    WHEN ((vagas.salario) :: text = 'undefined' :: text) THEN (wd.salario_vazio) :: character varying
    WHEN ((vagas.salario) :: numeric < (0) :: numeric) THEN (wd.salario_vazio) :: character varying
    ELSE vagas.salario
  END AS salario
FROM
  (
    vagas
    CROSS JOIN words wd
  );