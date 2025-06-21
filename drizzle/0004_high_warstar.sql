PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_assistants` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`prompt` text NOT NULL,
	`knowledge_ids` text,
	`type` text DEFAULT 'assistant' NOT NULL,
	`emoji` text,
	`description` text,
	`model` blob,
	`default_model` blob,
	`settings` blob,
	`enable_web_search` integer,
	`websearch_provider_id` text,
	`enable_generate_image` integer,
	`mcp_servers` blob,
	`knowledge_recognition` text,
	`tags` text,
	`groups` text
);
--> statement-breakpoint
INSERT INTO `__new_assistants`("id", "name", "prompt", "knowledge_ids", "type", "emoji", "description", "model", "default_model", "settings", "enable_web_search", "websearch_provider_id", "enable_generate_image", "mcp_servers", "knowledge_recognition", "tags", "groups") SELECT "id", "name", "prompt", "knowledge_ids", "type", "emoji", "description", "model", "default_model", "settings", "enable_web_search", "websearch_provider_id", "enable_generate_image", "mcp_servers", "knowledge_recognition", "tags", "groups" FROM `assistants`;--> statement-breakpoint
DROP TABLE `assistants`;--> statement-breakpoint
ALTER TABLE `__new_assistants` RENAME TO `assistants`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `assistants_id_unique` ON `assistants` (`id`);