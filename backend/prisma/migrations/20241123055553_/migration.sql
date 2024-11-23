/*
  Warnings:

  - A unique constraint covering the columns `[licenseNumber]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "UserAvailability" AS ENUM ('AVAILABLE', 'BUSY', 'ON_LEAVE');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "availability" "UserAvailability" NOT NULL DEFAULT 'AVAILABLE';

-- CreateIndex
CREATE UNIQUE INDEX "users_licenseNumber_key" ON "users"("licenseNumber");
