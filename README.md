# slack-canned
Canned phrases for Slack

Displays predefined messages based on commands send to the server. Requires Redis.

Set an outgoing webhook to point to `/slack`. Setting the trigger word to `!` is recommended so that commands will look like `!command`.

Predefined messages will be imported from `cans.json` on server start. Responses must be formatted for Slack. See the examples in `cans.json`.

If a command does not exist, a user can add a new message through Slack by including the message text immediately after the command. This can be disabled in `config.json`. A JSON string formatted for Slack can be used. As of right now, messages added using this method can only be modified in redis, so don't mess it up!
