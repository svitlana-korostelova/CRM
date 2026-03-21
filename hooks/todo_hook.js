async function main() {
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  const data = JSON.parse(Buffer.concat(chunks).toString());

  const todos = data.tool_response?.newTodos || data.tool_input?.todos || [];

  if (todos.length === 0) {
    process.exit(0);
  }

  const statusEmoji = {
    completed: "✅",
    in_progress: "🔄",
    pending: "⬜",
  };

  const priorityLabel = {
    high: "[HIGH]",
    medium: "[MED] ",
    low: "[LOW] ",
  };

  const lines = ["", "📋 Todo List:", "─".repeat(44)];
  for (const todo of todos) {
    const emoji = statusEmoji[todo.status] ?? "⬜";
    const priority = priorityLabel[todo.priority] ?? "      ";
    lines.push(`  ${emoji} ${priority} ${todo.content}`);
  }
  lines.push("─".repeat(44), "");

  process.stderr.write(lines.join("\n"));
  process.exit(0);
}

main();
