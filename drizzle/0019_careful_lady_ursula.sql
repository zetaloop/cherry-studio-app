ALTER TABLE `assistants` ADD `websearch_provider_id` text REFERENCES websearch_providers(id);--> statement-breakpoint
ALTER TABLE `providers` DROP COLUMN `checked`;