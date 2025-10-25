/*
  Warnings:

  - You are about to drop the `space_portals` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."space_portals" DROP CONSTRAINT "space_portals_map_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."space_portals" DROP CONSTRAINT "space_portals_space_id_fkey";

-- DropTable
DROP TABLE "public"."space_portals";

-- CreateTable
CREATE TABLE "map_spaces" (
    "id" SERIAL NOT NULL,
    "map_id" INTEGER NOT NULL,
    "space_id" INTEGER NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,

    CONSTRAINT "map_spaces_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "map_spaces_map_id_space_id_key" ON "map_spaces"("map_id", "space_id");

-- AddForeignKey
ALTER TABLE "map_spaces" ADD CONSTRAINT "map_spaces_map_id_fkey" FOREIGN KEY ("map_id") REFERENCES "maps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "map_spaces" ADD CONSTRAINT "map_spaces_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "spaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;
