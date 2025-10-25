-- AlterTable
ALTER TABLE "messages" ADD COLUMN     "map_id" INTEGER,
ALTER COLUMN "space_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_map_id_fkey" FOREIGN KEY ("map_id") REFERENCES "maps"("id") ON DELETE CASCADE ON UPDATE CASCADE;
