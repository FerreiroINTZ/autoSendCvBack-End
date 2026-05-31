# Coisas a serem arrumadas
A ordenacao do prisma segue por data de registro. Entao se eu decidir ordenar primeiro pelos melhores nao vai dar certo, pois o prisma nao tem um "order by paridade". E nao tem como fazere isso, ja que seria necessario ordenar na tabela de "ai_analysis".
A ordenacao atual pega os dados do banco e ordena com js os resulados, e nao a pesquisa em si.
Para posibiliar essa ordenacao sera preciso uma mudanca drastica no banco, onde as fk da AI vao sair da "vagas" e ir para o "ai_analys", contendo o id da vaga, e nao vice versa