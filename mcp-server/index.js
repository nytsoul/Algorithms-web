import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

// Initialize Supabase client
const supabase = createClient(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

// Create MCP server
const server = new Server(
    {
        name: "algoverse-supabase-mcp",
        version: "1.0.0",
    },
    {
        capabilities: {
            tools: {},
        },
    }
);

// Tool: Read all rows from a table
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "read_table",
                description: "Read all rows from a Supabase table. Use this to fetch algorithm data, user data, or any other table data.",
                inputSchema: {
                    type: "object",
                    properties: {
                        table: {
                            type: "string",
                            description: "The name of the table to read from (e.g., 'algorithms', 'users')",
                        },
                        limit: {
                            type: "number",
                            description: "Maximum number of rows to return (optional, default: all)",
                        },
                    },
                    required: ["table"],
                },
            },
            {
                name: "query_table",
                description: "Query a Supabase table with filters. Use this for specific searches (e.g., find algorithms by domain, difficulty, or name).",
                inputSchema: {
                    type: "object",
                    properties: {
                        table: {
                            type: "string",
                            description: "The name of the table to query",
                        },
                        column: {
                            type: "string",
                            description: "The column to filter on (e.g., 'domain', 'difficulty', 'name')",
                        },
                        value: {
                            type: "string",
                            description: "The value to match",
                        },
                    },
                    required: ["table", "column", "value"],
                },
            },
            {
                name: "insert_row",
                description: "Insert a new row into a Supabase table. Use this to add new algorithms, users, or other data.",
                inputSchema: {
                    type: "object",
                    properties: {
                        table: {
                            type: "string",
                            description: "The name of the table to insert into",
                        },
                        values: {
                            type: "object",
                            description: "The row data to insert (as a JSON object)",
                        },
                    },
                    required: ["table", "values"],
                },
            },
            {
                name: "update_row",
                description: "Update an existing row in a Supabase table. Use this to modify algorithm data, user profiles, etc.",
                inputSchema: {
                    type: "object",
                    properties: {
                        table: {
                            type: "string",
                            description: "The name of the table to update",
                        },
                        id: {
                            type: "string",
                            description: "The ID of the row to update",
                        },
                        values: {
                            type: "object",
                            description: "The updated data (as a JSON object)",
                        },
                    },
                    required: ["table", "id", "values"],
                },
            },
            {
                name: "delete_row",
                description: "Delete a row from a Supabase table. Use with caution.",
                inputSchema: {
                    type: "object",
                    properties: {
                        table: {
                            type: "string",
                            description: "The name of the table",
                        },
                        id: {
                            type: "string",
                            description: "The ID of the row to delete",
                        },
                    },
                    required: ["table", "id"],
                },
            },
            {
                name: "count_rows",
                description: "Count the number of rows in a table, optionally with filters.",
                inputSchema: {
                    type: "object",
                    properties: {
                        table: {
                            type: "string",
                            description: "The name of the table to count",
                        },
                        column: {
                            type: "string",
                            description: "Optional column to filter on",
                        },
                        value: {
                            type: "string",
                            description: "Optional value to match for filtering",
                        },
                    },
                    required: ["table"],
                },
            },
            {
                name: "check_connection",
                description: "Check if Supabase is connected and accessible. Returns connection status, database information, and tests basic query functionality.",
                inputSchema: {
                    type: "object",
                    properties: {},
                    required: [],
                },
            },
        ],
    };
});

// Tool call handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
        switch (name) {
            case "read_table": {
                const { table, limit } = args as { table: string; limit?: number };

                // Validate table name to prevent SQL injection
                if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(table)) {
                    throw new Error("Invalid table name");
                }

                let query = supabase.from(table).select("*");
                if (limit) {
                    query = query.limit(limit);
                }

                const { data, error } = await query;
                if (error) throw error;

                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(data, null, 2),
                        },
                    ],
                };
            }

            case "query_table": {
                const { table, column, value } = args as {
                    table: string;
                    column: string;
                    value: string;
                };

                // Validate inputs
                if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(table)) {
                    throw new Error("Invalid table name");
                }
                if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(column)) {
                    throw new Error("Invalid column name");
                }

                const { data, error } = await supabase
                    .from(table)
                    .select("*")
                    .eq(column, value);

                if (error) throw error;

                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(data, null, 2),
                        },
                    ],
                };
            }

            case "insert_row": {
                const { table, values } = args as { table: string; values: any };

                if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(table)) {
                    throw new Error("Invalid table name");
                }

                const { data, error } = await supabase
                    .from(table)
                    .insert([values])
                    .select();

                if (error) throw error;

                return {
                    content: [
                        {
                            type: "text",
                            text: `Successfully inserted row into ${table}: ${JSON.stringify(data, null, 2)}`,
                        },
                    ],
                };
            }

            case "update_row": {
                const { table, id, values } = args as {
                    table: string;
                    id: string;
                    values: any;
                };

                if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(table)) {
                    throw new Error("Invalid table name");
                }

                const { data, error } = await supabase
                    .from(table)
                    .update(values)
                    .eq("id", id)
                    .select();

                if (error) throw error;

                return {
                    content: [
                        {
                            type: "text",
                            text: `Successfully updated row in ${table}: ${JSON.stringify(data, null, 2)}`,
                        },
                    ],
                };
            }

            case "delete_row": {
                const { table, id } = args as { table: string; id: string };

                if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(table)) {
                    throw new Error("Invalid table name");
                }

                const { error } = await supabase.from(table).delete().eq("id", id);

                if (error) throw error;

                return {
                    content: [
                        {
                            type: "text",
                            text: `Successfully deleted row with id ${id} from ${table}`,
                        },
                    ],
                };
            }

            case "count_rows": {
                const { table, column, value } = args as {
                    table: string;
                    column?: string;
                    value?: string;
                };

                if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(table)) {
                    throw new Error("Invalid table name");
                }

                let query = supabase.from(table).select("*", { count: "exact", head: true });

                if (column && value) {
                    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(column)) {
                        throw new Error("Invalid column name");
                    }
                    query = query.eq(column, value);
                }

                const { count, error } = await query;

                if (error) throw error;

                return {
                    content: [
                        {
                            type: "text",
                            text: `Count: ${count}`,
                        },
                    ],
                };
            }

            case "check_connection": {
                const connectionStatus = {
                    supabaseUrl: process.env.SUPABASE_URL || "Not configured",
                    hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
                    timestamp: new Date().toISOString(),
                    status: "unknown",
                    message: "",
                    testResults: {}
                };

                try {
                    // Test 1: Check if credentials are configured
                    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
                        connectionStatus.status = "error";
                        connectionStatus.message = "Supabase credentials not configured in .env file";
                        return {
                            content: [
                                {
                                    type: "text",
                                    text: JSON.stringify(connectionStatus, null, 2),
                                },
                            ],
                        };
                    }

                    // Test 2: Try to query a system table (pg_tables) to verify connection
                    const { data: tables, error: tablesError } = await supabase
                        .from("pg_tables")
                        .select("tablename")
                        .limit(1);

                    if (tablesError) {
                        // If pg_tables doesn't work, try a simple health check
                        connectionStatus.testResults = {
                            systemTableQuery: "Failed (expected - RLS may be enabled)",
                            error: tablesError.message
                        };
                    } else {
                        connectionStatus.testResults = {
                            systemTableQuery: "Success",
                            tablesFound: tables?.length || 0
                        };
                    }

                    // Test 3: Try to list available tables using REST API
                    try {
                        const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/`, {
                            headers: {
                                'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY || '',
                                'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
                            }
                        });

                        connectionStatus.testResults.restApiPing = response.ok ? "Success" : `Failed (${response.status})`;
                    } catch (fetchError) {
                        connectionStatus.testResults.restApiPing = `Failed: ${fetchError.message}`;
                    }

                    // Overall status
                    if (connectionStatus.testResults.restApiPing?.includes("Success")) {
                        connectionStatus.status = "connected";
                        connectionStatus.message = "✅ Supabase is connected and accessible";
                    } else {
                        connectionStatus.status = "degraded";
                        connectionStatus.message = "⚠️ Supabase credentials configured but connection tests failed";
                    }

                    return {
                        content: [
                            {
                                type: "text",
                                text: JSON.stringify(connectionStatus, null, 2),
                            },
                        ],
                    };
                } catch (error) {
                    connectionStatus.status = "error";
                    connectionStatus.message = `❌ Connection check failed: ${error.message}`;
                    return {
                        content: [
                            {
                                type: "text",
                                text: JSON.stringify(connectionStatus, null, 2),
                            },
                        ],
                        isError: true,
                    };
                }
            }

            default:
                throw new Error(`Unknown tool: ${name}`);
        }
    } catch (error: any) {
        return {
            content: [
                {
                    type: "text",
                    text: `Error: ${error.message}`,
                },
            ],
            isError: true,
        };
    }
});

// Start the server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("AlgoVerse Supabase MCP server running on stdio");
}

main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
