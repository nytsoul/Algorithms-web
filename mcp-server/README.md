# AlgoVerse Supabase MCP Server

## 🎯 Overview

This MCP (Model Context Protocol) server enables AI agents to securely interact with the AlgoVerse Supabase database through standardized tool calls.

## 🏗️ Architecture

```
Antigravity AI Agent
   ↓ (MCP Tool Call)
Supabase MCP Server
   ↓
Supabase (Postgres + Auth + Realtime)
```

The AI agent never directly queries the database. It calls tools, and tools talk to Supabase.

## 🛠️ Available Tools

### 1. `read_table`
Read all rows from a Supabase table.

**Parameters:**
- `table` (string, required): Table name (e.g., 'algorithms', 'users')
- `limit` (number, optional): Maximum rows to return

**Example:**
```json
{
  "tool": "read_table",
  "arguments": {
    "table": "algorithms",
    "limit": 10
  }
}
```

### 2. `query_table`
Query a table with filters.

**Parameters:**
- `table` (string, required): Table name
- `column` (string, required): Column to filter on
- `value` (string, required): Value to match

**Example:**
```json
{
  "tool": "query_table",
  "arguments": {
    "table": "algorithms",
    "column": "domain",
    "value": "DSA"
  }
}
```

### 3. `insert_row`
Insert a new row into a table.

**Parameters:**
- `table` (string, required): Table name
- `values` (object, required): Row data as JSON

**Example:**
```json
{
  "tool": "insert_row",
  "arguments": {
    "table": "users",
    "values": {
      "email": "user@example.com",
      "name": "John Doe"
    }
  }
}
```

### 4. `update_row`
Update an existing row.

**Parameters:**
- `table` (string, required): Table name
- `id` (string, required): Row ID
- `values` (object, required): Updated data

**Example:**
```json
{
  "tool": "update_row",
  "arguments": {
    "table": "algorithms",
    "id": "123",
    "values": {
      "difficulty": "Advanced"
    }
  }
}
```

### 5. `delete_row`
Delete a row from a table.

**Parameters:**
- `table` (string, required): Table name
- `id` (string, required): Row ID

**Example:**
```json
{
  "tool": "delete_row",
  "arguments": {
    "table": "users",
    "id": "456"
  }
}
```

### 6. `count_rows`
Count rows in a table, optionally with filters.

**Parameters:**
- `table` (string, required): Table name
- `column` (string, optional): Column to filter on
- `value` (string, optional): Value to match

**Example:**
```json
{
  "tool": "count_rows",
  "arguments": {
    "table": "algorithms",
    "column": "difficulty",
    "value": "Beginner"
  }
}
```

### 7. `check_connection`
Check if Supabase is connected and accessible.

**Parameters:**
- None

**Example:**
```json
{
  "tool": "check_connection",
  "arguments": {}
}
```

**Response:**
```json
{
  "supabaseUrl": "https://tuhjfziufhfcjdvthaaj.supabase.co",
  "hasServiceKey": true,
  "timestamp": "2026-01-14T16:35:00.000Z",
  "status": "connected",
  "message": "✅ Supabase is connected and accessible",
  "testResults": {
    "systemTableQuery": "Failed (expected - RLS may be enabled)",
    "restApiPing": "Success"
  }
}
```

## 🔐 Security Features

- ✅ **Input Validation**: All table and column names are validated using regex to prevent SQL injection
- ✅ **Service Role Key**: Uses Supabase service role key (never exposed to frontend)
- ✅ **Error Handling**: Comprehensive error handling with detailed messages
- ✅ **Row Level Security**: Works with Supabase RLS policies

## 🚀 Usage from AI Agent

### Example Prompts:

1. **"Show me all algorithms in the DSA domain"**
   - Agent calls: `query_table` with `table="algorithms"`, `column="domain"`, `value="DSA"`

2. **"How many beginner-level algorithms are there?"**
   - Agent calls: `count_rows` with `table="algorithms"`, `column="difficulty"`, `value="Beginner"`

3. **"Add a new user to the database"**
   - Agent calls: `insert_row` with appropriate user data

## 📝 Configuration

The MCP server is configured in Antigravity's MCP settings:

```json
{
  "mcpServers": {
    "algoverse-supabase": {
      "command": "node",
      "args": ["d:/Programming/Project/Algorithms/mcp-server/index.js"],
      "env": {
        "SUPABASE_URL": "https://frcqntcmrpjiydoihbcm.supabase.co",
        "SUPABASE_SERVICE_ROLE_KEY": "your_service_role_key"
      }
    }
  }
}
```

## 🔧 Development

### Test Supabase Connection:
```bash
cd mcp-server
npm run test:connection
```

This will verify:
- ✅ Supabase URL is configured
- ✅ Service role key is present
- ✅ REST API is accessible
- ✅ Database queries work

### Start the MCP server:
```bash
cd mcp-server
npm start
```

### Test with Antigravity:
1. Ensure Antigravity MCP config is set up
2. Restart Antigravity
3. Use natural language prompts that require database access
4. The AI agent will automatically call the appropriate MCP tools

## ⚠️ Important Notes

- The service role key has **full database access** - use with caution
- Always validate inputs in production
- Consider implementing additional authorization checks
- Use Supabase Row Level Security (RLS) for fine-grained access control

## 📚 Resources

- [Model Context Protocol Docs](https://modelcontextprotocol.io/)
- [Supabase Documentation](https://supabase.com/docs)
- [Antigravity MCP Guide](https://docs.antigravity.ai/mcp)
