ALTER TABLE `assistants` ADD `websearch_provider_id` text REFERENCES websearch_providers(id);--> statement-breakpoint
CREATE INDEX `idx_assistant_websearch_provider_id` ON `assistants` (`id`);