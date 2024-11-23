-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_specialistId_fkey";

-- AlterTable
ALTER TABLE "appointments" ALTER COLUMN "specialistId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_specialistId_fkey" FOREIGN KEY ("specialistId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
