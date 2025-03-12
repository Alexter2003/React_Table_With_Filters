"use client"

import { useState } from "react"
import { CalendarIcon, Search, X } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Sample data
const data = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex@example.com",
    status: "Active",
    role: "Developer",
    date: new Date("2023-01-15"),
    priority: "High",
  },
  {
    id: 2,
    name: "Sam Wilson",
    email: "sam@example.com",
    status: "Inactive",
    role: "Designer",
    date: new Date("2023-02-20"),
    priority: "Medium",
  },
  {
    id: 3,
    name: "Taylor Swift",
    email: "taylor@example.com",
    status: "Active",
    role: "Manager",
    date: new Date("2023-03-10"),
    priority: "Low",
  },
  {
    id: 4,
    name: "Jamie Lee",
    email: "jamie@example.com",
    status: "Pending",
    role: "Developer",
    date: new Date("2023-04-05"),
    priority: "High",
  },
  {
    id: 5,
    name: "Morgan Freeman",
    email: "morgan@example.com",
    status: "Active",
    role: "Designer",
    date: new Date("2023-05-12"),
    priority: "Medium",
  },
  {
    id: 6,
    name: "Casey Jones",
    email: "casey@example.com",
    status: "Inactive",
    role: "Manager",
    date: new Date("2023-06-18"),
    priority: "Low",
  },
  {
    id: 7,
    name: "Riley Parker",
    email: "riley@example.com",
    status: "Active",
    role: "Developer",
    date: new Date("2023-07-22"),
    priority: "High",
  },
  {
    id: 8,
    name: "Jordan Smith",
    email: "jordan@example.com",
    status: "Pending",
    role: "Designer",
    date: new Date("2023-08-30"),
    priority: "Medium",
  },
]

const statusOptions = ["Active", "Inactive", "Pending"]
const roleOptions = ["Developer", "Designer", "Manager"]
const priorityOptions = ["High", "Medium", "Low"]

export default function FilterTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string[]>([])
  const [roleFilter, setRoleFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState<string[]>([])
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined)

  // Filter the data based on all active filters
  const filteredData = data.filter((item) => {
    // Text search filter
    const matchesSearch =
      searchTerm === "" ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase())

    // Status filter (multi-select)
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(item.status)

    // Role filter (single select)
    const matchesRole = roleFilter === "all" || item.role === roleFilter

    // Priority filter (multi-select)
    const matchesPriority = priorityFilter.length === 0 || priorityFilter.includes(item.priority)

    // Date filter
    const matchesDate = !dateFilter || format(item.date, "yyyy-MM-dd") === format(dateFilter, "yyyy-MM-dd")

    return matchesSearch && matchesStatus && matchesRole && matchesPriority && matchesDate
  })

  // Toggle status filter
  const toggleStatusFilter = (status: string) => {
    setStatusFilter((prev) => (prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]))
  }

  // Toggle priority filter
  const togglePriorityFilter = (priority: string) => {
    setPriorityFilter((prev) => (prev.includes(priority) ? prev.filter((p) => p !== priority) : [...prev, priority]))
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("")
    setStatusFilter([])
    setRoleFilter("all")
    setPriorityFilter([])
    setDateFilter(undefined)
  }

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500/20 text-green-500 hover:bg-green-500/20"
      case "Inactive":
        return "bg-red-500/20 text-red-500 hover:bg-red-500/20"
      case "Pending":
        return "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/20"
      default:
        return ""
    }
  }

  // Get priority badge color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-500/20 text-red-500 hover:bg-red-500/20"
      case "Medium":
        return "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/20"
      case "Low":
        return "bg-blue-500/20 text-blue-500 hover:bg-blue-500/20"
      default:
        return ""
    }
  }

  return (
    <div className="dark w-full bg-gray-900 h-screen ">
      <div className="dark:bg-gray-900 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 dark:text-white">Team Members</h2>

        {/* Filters section */}
        <div className="space-y-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Text search filter */}
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setSearchTerm("")}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Clear search</span>
                </Button>
              )}
            </div>

            {/* Date filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full sm:w-[240px] justify-start text-left font-normal dark:bg-gray-800 dark:border-gray-700 dark:text-white ${!dateFilter && "text-muted-foreground"
                    }`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateFilter ? format(dateFilter, "PPP") : "Filter by date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 dark:bg-gray-800 dark:border-gray-700" align="start">
                <Calendar
                  mode="single"
                  selected={dateFilter}
                  onSelect={setDateFilter}
                  initialFocus
                  className="dark:bg-gray-800"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-wrap gap-2">
            {/* Status filter (multi-select) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                  Status {statusFilter.length > 0 && `(${statusFilter.length})`}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="dark:bg-gray-800 dark:border-gray-700">
                {statusOptions.map((status) => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={statusFilter.includes(status)}
                    onCheckedChange={() => toggleStatusFilter(status)}
                    className="dark:text-white"
                  >
                    {status}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Role filter (single select) */}
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[180px] dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                <SelectItem value="all" className="dark:text-white">
                  All roles
                </SelectItem>
                {roleOptions.map((role) => (
                  <SelectItem key={role} value={role} className="dark:text-white">
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Priority filter (multi-select) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                  Priority {priorityFilter.length > 0 && `(${priorityFilter.length})`}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="dark:bg-gray-800 dark:border-gray-700">
                {priorityOptions.map((priority) => (
                  <DropdownMenuCheckboxItem
                    key={priority}
                    checked={priorityFilter.includes(priority)}
                    onCheckedChange={() => togglePriorityFilter(priority)}
                    className="dark:text-white"
                  >
                    {priority}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Clear filters button */}
            {(searchTerm || statusFilter.length > 0 || roleFilter || priorityFilter.length > 0 || dateFilter) && (
              <Button variant="ghost" onClick={clearFilters} className="dark:text-white">
                Clear filters
              </Button>
            )}
          </div>
        </div>

        {/* Active filters display */}
        {(statusFilter.length > 0 || roleFilter || priorityFilter.length > 0 || dateFilter) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {statusFilter.map((status) => (
              <Badge key={status} variant="secondary" className="dark:bg-gray-800 dark:text-white">
                Status: {status}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 ml-2 hover:bg-transparent"
                  onClick={() => toggleStatusFilter(status)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {status} filter</span>
                </Button>
              </Badge>
            ))}

            {roleFilter && (
              <Badge variant="secondary" className="dark:bg-gray-800 dark:text-white">
                Role: {roleFilter}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 ml-2 hover:bg-transparent"
                  onClick={() => setRoleFilter("all")}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove role filter</span>
                </Button>
              </Badge>
            )}

            {priorityFilter.map((priority) => (
              <Badge key={priority} variant="secondary" className="dark:bg-gray-800 dark:text-white">
                Priority: {priority}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 ml-2 hover:bg-transparent"
                  onClick={() => togglePriorityFilter(priority)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {priority} filter</span>
                </Button>
              </Badge>
            ))}

            {dateFilter && (
              <Badge variant="secondary" className="dark:bg-gray-800 dark:text-white">
                Date: {format(dateFilter, "PP")}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 ml-2 hover:bg-transparent"
                  onClick={() => setDateFilter(undefined)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove date filter</span>
                </Button>
              </Badge>
            )}
          </div>
        )}

        {/* Results count */}
        <div className="text-sm text-muted-foreground mb-4 dark:text-gray-400">
          Showing {filteredData.length} of {data.length} results
        </div>

        {/* Table */}
        <div className="border rounded-md dark:border-gray-700">
          <Table>
            <TableHeader className="dark:bg-gray-800">
              <TableRow className="dark:border-gray-700">
                <TableHead className="dark:text-gray-300">Name</TableHead>
                <TableHead className="dark:text-gray-300">Email</TableHead>
                <TableHead className="dark:text-gray-300">Status</TableHead>
                <TableHead className="dark:text-gray-300">Role</TableHead>
                <TableHead className="dark:text-gray-300">Date</TableHead>
                <TableHead className="dark:text-gray-300">Priority</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <TableRow key={item.id} className="dark:border-gray-700">
                    <TableCell className="font-medium dark:text-white">{item.name}</TableCell>
                    <TableCell className="dark:text-gray-300">{item.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="dark:text-gray-300">{item.role}</TableCell>
                    <TableCell className="dark:text-gray-300">{format(item.date, "PP")}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getPriorityColor(item.priority)}>
                        {item.priority}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center dark:text-gray-300">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

