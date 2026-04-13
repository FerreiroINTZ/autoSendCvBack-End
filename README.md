# Documentacao dos Dias

# 12/abr/2026
Tive uma serie de problemas. Como o banco ja existia eu tive que criar os migrations nao mao. O problema era que para dar um Diff nos migrations eu precisava de um shadow database e o arquivos "migration_lock-toml". 

Esse arquivo foi feito na mao, criando ele na raiz da pasta "prisma/migrations", e escrevendo 'provider = "postgresql"'. 

Ja o shadow database tive que criar no banco e atribuir meu usario a ele.

Alem do mais, confundi o adapter do postgres com o "@prisma/adatper-ppg", mas era o "@prisma/adapter-pg", apenas.

Por fim, lembre que a senha da URL do banco e a do usuario do banco, e nao do computador.