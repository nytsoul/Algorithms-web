const { data, error } = await supabase
  .from("your_table_name")
  .select("*")
  .limit(1)

if (error) {
  console.error("Supabase error:", error)
} else {
  console.log("Supabase OK:", data)
}
