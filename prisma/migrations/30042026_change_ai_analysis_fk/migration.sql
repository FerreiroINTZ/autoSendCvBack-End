-- DropForeignKey
ALTER TABLE "vagas" DROP CONSTRAINT "vagas_ai_analysis_fk_fkey";

-- AddForeignKey
ALTER TABLE "vagas" ADD CONSTRAINT "vagas_ai_analysis_fk_fkey" FOREIGN KEY ("ai_analysis_fk") REFERENCES "ai_analysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

