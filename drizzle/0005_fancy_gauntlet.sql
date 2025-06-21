ALTER TABLE `assistants` ADD `group` text;--> statement-breakpoint
ALTER TABLE `assistants` DROP COLUMN `knowledge_ids`;--> statement-breakpoint
ALTER TABLE `assistants` DROP COLUMN `websearch_provider_id`;--> statement-breakpoint
ALTER TABLE `assistants` DROP COLUMN `mcp_servers`;--> statement-breakpoint
ALTER TABLE `assistants` DROP COLUMN `groups`;