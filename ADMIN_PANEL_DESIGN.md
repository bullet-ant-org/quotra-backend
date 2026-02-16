# Quotra Admin Panel Design Specification

## Overview

This document provides a comprehensive design specification for a modern, beautiful admin panel for the Quotra financial platform. The admin panel will be built using **React**, **Tailwind CSS**, and **Shadcn/ui** components for a sleek, professional appearance with excellent user experience.

## Tech Stack

### Core Technologies
- **Frontend Framework**: React 18+ with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui (built on Radix UI)
- **Icons**: Lucide React (modern, consistent icon set)
- **Charts**: Recharts (React charting library)
- **Data Tables**: TanStack Table (powerful table library)
- **Forms**: React Hook Form with Zod validation
- **State Management**: Zustand (lightweight state management)
- **API Client**: TanStack Query (React Query) for server state management
- **Routing**: React Router v6
- **Date Handling**: date-fns
- **Notifications**: Sonner (toast notifications)

### Additional Libraries
- **File Upload**: React Dropzone
- **Modal Management**: Custom modal system with Framer Motion
- **Loading States**: Skeleton loaders and spinners
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## Design System

### Color Palette

#### Primary Colors (Red Theme)
```css
--primary: #dc2626;        /* Red-600 */
--primary-foreground: #ffffff;
--primary-hover: #b91c1c;   /* Red-700 */
--primary-light: #fecaca;   /* Red-200 */
--primary-dark: #991b1b;    /* Red-800 */
```

#### Neutral Colors
```css
--background: #ffffff;
--foreground: #0f172a;      /* Slate-900 */
--muted: #f1f5f9;          /* Slate-100 */
--muted-foreground: #64748b; /* Slate-500 */
--border: #e2e8f0;         /* Slate-200 */
--input: #f8fafc;          /* Slate-50 */
```

#### Status Colors
```css
--success: #16a34a;        /* Green-600 */
--warning: #ca8a04;        /* Yellow-600 */
--error: #dc2626;          /* Red-600 */
--info: #2563eb;           /* Blue-600 */
```

#### Semantic Colors
```css
--pending: #f59e0b;        /* Amber-500 */
--approved: #10b981;       /* Emerald-500 */
--rejected: #ef4444;       /* Red-500 */
--processing: #3b82f6;     /* Blue-500 */
```

### Typography

#### Font Family
- **Primary**: Inter (Google Fonts)
- **Fallback**: system-ui, -apple-system, sans-serif

#### Font Sizes
```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 0.9375rem; /* 15px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
```

#### Font Weights
- **Regular**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700

### Spacing Scale
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

### Border Radius
```css
--radius-sm: 0.25rem;  /* 4px */
--radius-md: 0.375rem; /* 6px */
--radius-lg: 0.5rem;   /* 8px */
--radius-xl: 0.75rem;  /* 12px */
--radius-2xl: 1rem;    /* 16px */
```

### Shadows
```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
```

## Layout Structure

### Main Layout

```jsx
function AdminLayout() {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <AdminHeader />

      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
```

### Header Component

```jsx
function AdminHeader() {
  return (
    <header className="bg-white border-b border-border h-16 flex items-center justify-between px-6">
      {/* Logo and Title */}
      <div className="flex items-center space-x-4">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-primary-foreground" />
        </div>
        <h1 className="text-xl font-semibold text-foreground">Quotra Admin</h1>
      </div>

      {/* User Menu */}
      <AdminUserMenu />
    </header>
  );
}
```

### Sidebar Component

```jsx
function AdminSidebar() {
  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Transactions', href: '/admin/transactions', icon: CreditCard },
    { name: 'Deposits', href: '/admin/deposits', icon: ArrowDownCircle },
    { name: 'Withdrawals', href: '/admin/withdrawals', icon: ArrowUpCircle },
    { name: 'Asset Orders', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Loan Orders', href: '/admin/loan-orders', icon: FileText },
    { name: 'Pricing', href: '/admin/pricing', icon: DollarSign },
    { name: 'Loan Types', href: '/admin/loan-types', icon: PiggyBank },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-border min-h-screen">
      <nav className="p-4 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
```

## Dashboard Overview Page

### Statistics Cards

```jsx
function StatsCards() {
  const stats = [
    {
      title: 'Total Users',
      value: '12,345',
      change: '+12.5%',
      changeType: 'positive',
      icon: Users,
    },
    {
      title: 'Total Balance',
      value: '$2,345,678',
      change: '+8.2%',
      changeType: 'positive',
      icon: DollarSign,
    },
    {
      title: 'Active Investments',
      value: '8,921',
      change: '+15.3%',
      changeType: 'positive',
      icon: TrendingUp,
    },
    {
      title: 'Pending Approvals',
      value: '47',
      change: '-5.1%',
      changeType: 'negative',
      icon: Clock,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <Card key={stat.title} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              <p className={`text-sm flex items-center ${
                stat.changeType === 'positive' ? 'text-success' : 'text-error'
              }`}>
                <TrendingUp className="w-4 h-4 mr-1" />
                {stat.change} from last month
              </p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <stat.icon className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
```

### Charts Section

```jsx
function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Revenue Chart */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Revenue Overview</h3>
          <Select defaultValue="30d">
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 days</SelectItem>
              <SelectItem value="30d">30 days</SelectItem>
              <SelectItem value="90d">90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#dc2626"
                strokeWidth={2}
                dot={{ fill: '#dc2626' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* User Registration Chart */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">User Registrations</h3>
          <Select defaultValue="30d">
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 days</SelectItem>
              <SelectItem value="30d">30 days</SelectItem>
              <SelectItem value="90d">90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={userData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#dc2626" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
```

### Recent Activities

```jsx
function RecentActivities() {
  const activities = [
    {
      user: 'John Doe',
      action: 'Made a deposit',
      amount: '$500',
      time: '2 minutes ago',
      type: 'deposit',
    },
    {
      user: 'Jane Smith',
      action: 'Requested withdrawal',
      amount: '$200',
      time: '5 minutes ago',
      type: 'withdrawal',
    },
    // ... more activities
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Recent Activities</h3>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className={`p-2 rounded-lg ${
              activity.type === 'deposit' ? 'bg-success/10' :
              activity.type === 'withdrawal' ? 'bg-warning/10' : 'bg-info/10'
            }`}>
              {activity.type === 'deposit' && <ArrowDownCircle className="w-4 h-4 text-success" />}
              {activity.type === 'withdrawal' && <ArrowUpCircle className="w-4 h-4 text-warning" />}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{activity.user}</p>
              <p className="text-sm text-muted-foreground">{activity.action}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{activity.amount}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
```

## Users Management Page

### Users Table

```jsx
function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const columns = useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
          />
        ),
      },
      {
        accessorKey: 'username',
        header: 'Username',
        cell: ({ row }) => (
          <div className="flex items-center space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={row.original.profileImageUrl} />
              <AvatarFallback>{row.original.username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{row.original.username}</p>
              <p className="text-sm text-muted-foreground">{row.original.email}</p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'balance',
        header: 'Balance',
        cell: ({ row }) => (
          <span className="font-medium">${row.original.balance.toLocaleString()}</span>
        ),
      },
      {
        accessorKey: 'role',
        header: 'Role',
        cell: ({ row }) => (
          <Badge variant={row.original.role === 'admin' ? 'default' : 'secondary'}>
            {row.original.role}
          </Badge>
        ),
      },
      {
        accessorKey: 'accountStatus',
        header: 'Status',
        cell: ({ row }) => (
          <Badge
            variant={
              row.original.accountStatus === 'active' ? 'success' :
              row.original.accountStatus === 'pending_verification' ? 'warning' : 'destructive'
            }
          >
            {row.original.accountStatus.replace('_', ' ')}
          </Badge>
        ),
      },
      {
        accessorKey: 'createdAt',
        header: 'Joined',
        cell: ({ row }) => format(new Date(row.original.createdAt), 'MMM dd, yyyy'),
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => <UserActionsMenu user={row.original} />,
      },
    ],
    []
  );

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setSelectedUsers,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection: selectedUsers,
    },
  });

  return (
    <div className="space-y-4">
      {/* Filters and Search */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="user">Users</SelectItem>
              <SelectItem value="admin">Admins</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Table */}
      <Card>
        <div className="p-6">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            users.length
          )}{' '}
          of {users.length} users
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
```

### User Actions Menu

```jsx
function UserActionsMenu({ user }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Edit className="w-4 h-4 mr-2" />
          Edit User
        </DropdownMenuItem>
        <DropdownMenuItem>
          <DollarSign className="w-4 h-4 mr-2" />
          Adjust Balance
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Gift className="w-4 h-4 mr-2" />
          Add Bonus
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive">
          <Ban className="w-4 h-4 mr-2" />
          Suspend User
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

## Transactions Management Page

### Transactions Table with Advanced Filtering

```jsx
function TransactionsTable() {
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    dateRange: 'all',
    amountRange: 'all',
  });

  const columns = useMemo(
    () => [
      {
        accessorKey: 'userId',
        header: 'User',
        cell: ({ row }) => (
          <div className="flex items-center space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={row.original.user?.profileImageUrl} />
              <AvatarFallback>
                {row.original.user?.username?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{row.original.user?.username}</p>
              <p className="text-sm text-muted-foreground">{row.original.user?.email}</p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'type',
        header: 'Type',
        cell: ({ row }) => (
          <Badge
            variant={
              row.original.type === 'deposit' ? 'success' :
              row.original.type === 'withdrawal' ? 'warning' :
              row.original.type === 'investment' ? 'info' : 'secondary'
            }
          >
            {row.original.type}
          </Badge>
        ),
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
        cell: ({ row }) => (
          <span className="font-medium">${row.original.amount.toLocaleString()}</span>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => (
          <Badge
            variant={
              row.original.status === 'confirmed' ? 'success' :
              row.original.status === 'pending' ? 'warning' :
              row.original.status === 'failed' ? 'destructive' : 'secondary'
            }
          >
            {row.original.status}
          </Badge>
        ),
      },
      {
        accessorKey: 'transactionDate',
        header: 'Date',
        cell: ({ row }) => format(new Date(row.original.transactionDate), 'MMM dd, yyyy HH:mm'),
      },
      {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => (
          <p className="text-sm max-w-xs truncate">{row.original.description}</p>
        ),
      },
    ],
    []
  );

  return (
    <div className="space-y-6">
      {/* Advanced Filters */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="type-filter">Transaction Type</Label>
            <Select value={filters.type} onValueChange={(value) => setFilters({...filters, type: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="deposit">Deposits</SelectItem>
                <SelectItem value="withdrawal">Withdrawals</SelectItem>
                <SelectItem value="investment">Investments</SelectItem>
                <SelectItem value="bonus">Bonuses</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="status-filter">Status</Label>
            <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="date-filter">Date Range</Label>
            <Select value={filters.dateRange} onValueChange={(value) => setFilters({...filters, dateRange: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="amount-filter">Amount Range</Label>
            <Select value={filters.amountRange} onValueChange={(value) => setFilters({...filters, amountRange: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Amounts</SelectItem>
                <SelectItem value="small">Under $100</SelectItem>
                <SelectItem value="medium">$100 - $1000</SelectItem>
                <SelectItem value="large">Over $1000</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Transactions Table */}
      <Card>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Transactions</h3>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>

          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No transactions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
```

## Deposits and Withdrawals Management

### Approval Interface

```jsx
function ApprovalInterface({ requests, type }) {
  const [selectedRequests, setSelectedRequests] = useState([]);

  const handleBulkApprove = async () => {
    // Bulk approval logic
  };

  const handleBulkReject = async () => {
    // Bulk rejection logic
  };

  return (
    <div className="space-y-6">
      {/* Bulk Actions */}
      {selectedRequests.length > 0 && (
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {selectedRequests.length} requests selected
            </span>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleBulkApprove}>
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve All
              </Button>
              <Button variant="outline" onClick={handleBulkReject}>
                <XCircle className="w-4 h-4 mr-2" />
                Reject All
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Requests List */}
      <div className="grid gap-4">
        {requests.map((request) => (
          <Card key={request._id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Checkbox
                  checked={selectedRequests.includes(request._id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedRequests([...selectedRequests, request._id]);
                    } else {
                      setSelectedRequests(selectedRequests.filter(id => id !== request._id));
                    }
                  }}
                />
                <Avatar className="w-10 h-10">
                  <AvatarImage src={request.user?.profileImageUrl} />
                  <AvatarFallback>
                    {request.user?.username?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{request.user?.username}</p>
                  <p className="text-sm text-muted-foreground">{request.user?.email}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-lg font-semibold">${request.amount.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(request.requestDate), 'MMM dd, yyyy')}
                </p>
              </div>
            </div>

            {/* Request Details */}
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label className="text-xs text-muted-foreground">Crypto</Label>
                <p className="font-medium">{request.crypto}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Blockchain</Label>
                <p className="font-medium">{request.blockchain}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Wallet Address</Label>
                <p className="font-medium font-mono text-xs break-all">{request.walletAddress}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Status</Label>
                <Badge variant={request.status === 'pending' ? 'warning' : request.status === 'confirmed' ? 'success' : 'destructive'}>
                  {request.status}
                </Badge>
              </div>
            </div>

            {/* Action Buttons */}
            {request.status === 'pending' && (
              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleReject(request._id)}>
                  <X className="w-4 h-4 mr-2" />
                  Reject
                </Button>
                <Button size="sm" onClick={() => handleApprove(request._id)}>
                  <Check className="w-4 h-4 mr-2" />
                  Approve
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
```

## Settings Page

### Admin Settings Form

```jsx
function AdminSettings() {
  const [settings, setSettings] = useState({
    bitcoin: { blockchain: 'BTC', walletAddress: '' },
    ethereum: { blockchain: 'ERC20 (ETH)', walletAddress: '' },
    usdt: { blockchain: 'TRC20 (Tron)', walletAddress: '' },
  });

  const handleSave = async () => {
    // Save settings logic
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Admin Settings</h2>
        <p className="text-muted-foreground">Configure system-wide settings and wallet addresses.</p>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Crypto Wallet Addresses</h3>
        <p className="text-sm text-muted-foreground mb-6">
          These addresses will be displayed to users for deposits and withdrawals.
        </p>

        <div className="space-y-6">
          {/* Bitcoin Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="bitcoin-blockchain">Bitcoin Blockchain</Label>
              <Input
                id="bitcoin-blockchain"
                value={settings.bitcoin.blockchain}
                onChange={(e) => setSettings({
                  ...settings,
                  bitcoin: { ...settings.bitcoin, blockchain: e.target.value }
                })}
              />
            </div>
            <div>
              <Label htmlFor="bitcoin-address">Bitcoin Wallet Address</Label>
              <Input
                id="bitcoin-address"
                value={settings.bitcoin.walletAddress}
                onChange={(e) => setSettings({
                  ...settings,
                  bitcoin: { ...settings.bitcoin, walletAddress: e.target.value }
                })}
                placeholder="Enter Bitcoin wallet address"
              />
            </div>
          </div>

          {/* Ethereum Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="ethereum-blockchain">Ethereum Blockchain</Label>
              <Input
                id="ethereum-blockchain"
                value={settings.ethereum.blockchain}
                onChange={(e) => setSettings({
                  ...settings,
                  ethereum: { ...settings.ethereum, blockchain: e.target.value }
                })}
              />
            </div>
            <div>
              <Label htmlFor="ethereum-address">Ethereum Wallet Address</Label>
              <Input
                id="ethereum-address"
                value={settings.ethereum.walletAddress}
                onChange={(e) => setSettings({
                  ...settings,
                  ethereum: { ...settings.ethereum, walletAddress: e.target.value }
                })}
                placeholder="Enter Ethereum wallet address"
              />
            </div>
          </div>

          {/* USDT Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="usdt-blockchain">USDT Blockchain</Label>
              <Input
                id="usdt-blockchain"
                value={settings.usdt.blockchain}
                onChange={(e) => setSettings({
                  ...settings,
                  usdt: { ...settings.usdt, blockchain: e.target.value }
                })}
              />
            </div>
            <div>
              <Label htmlFor="usdt-address">USDT Wallet Address</Label>
              <Input
                id="usdt-address"
                value={settings.usdt.walletAddress}
                onChange={(e) => setSettings({
                  ...settings,
                  usdt: { ...settings.usdt, walletAddress: e.target.value }
                })}
                placeholder="Enter USDT wallet address"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </Card>
    </div>
  );
}
```

## Modal Components

### User Details Modal

```jsx
function UserDetailsModal({ user, isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            View and manage user information and account details.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Information */}
          <Card className="p-4">
            <div className="flex items-center space-x-4 mb-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={user?.profileImageUrl} />
                <AvatarFallback className="text-lg">
                  {user?.username?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">{user?.username}</h3>
                <p className="text-muted-foreground">{user?.email}</p>
                <Badge variant={user?.role === 'admin' ? 'default' : 'secondary'}>
                  {user?.role}
                </Badge>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Full Name</span>
                <span className="text-sm font-medium">{user?.fullName || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Phone</span>
                <span className="text-sm font-medium">{user?.phone || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Balance</span>
                <span className="text-sm font-medium">${user?.balance?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Account Status</span>
                <Badge variant={
                  user?.accountStatus === 'active' ? 'success' :
                  user?.accountStatus === 'pending_verification' ? 'warning' : 'destructive'
                }>
                  {user?.accountStatus?.replace('_', ' ')}
                </Badge>
              </div>
            </div>
          </Card>

          {/* Account Activity */}
          <Card className="p-4">
            <h4 className="font-semibold mb-4">Recent Activity</h4>
            <div className="space-y-3">
              {/* Activity items would be mapped here */}
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">Login from Chrome on Windows</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              {/* More activity items */}
            </div>
          </Card>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>
            Edit User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

## Responsive Design

### Mobile Layout Adjustments

```css
/* Mobile-first responsive design */
@media (max-width: 768px) {
  .admin-sidebar {
    @apply fixed inset-y-0 left-0 z-50 w-64 transform -translate-x-full transition-transform duration-300 ease-in-out;
  }

  .admin-sidebar.open {
    @apply translate-x-0;
  }

  .admin-main {
    @apply ml-0;
  }

  .stats-grid {
    @apply grid-cols-1 gap-4;
  }

  .table-responsive {
    @apply overflow-x-auto;
  }

  .modal-content {
    @apply mx-4 max-w-none;
  }
}

@media (max-width: 640px) {
  .admin-header {
    @apply px-4;
  }

  .admin-header h1 {
    @apply text-lg;
  }

  .filter-controls {
    @apply flex-col space-y-2 space-x-0;
  }

  .action-buttons {
    @apply flex-col space-y-2 space-x-0;
  }
}
```

## Animation and Interactions

### Loading States

```jsx
function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-muted rounded w-1/2"></div>
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex space-x-4">
          <div className="h-12 bg-muted rounded w-12"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Hover Effects and Transitions

```css
/* Smooth transitions for interactive elements */
.admin-nav-item {
  @apply transition-all duration-200 ease-in-out;
}

.admin-nav-item:hover {
  @apply bg-primary/10 transform scale-105;
}

.admin-card {
  @apply transition-all duration-300 ease-in-out;
}

.admin-card:hover {
  @apply shadow-lg transform -translate-y-1;
}

/* Button animations */
.btn-primary {
  @apply transition-all duration-200 ease-in-out;
}

.btn-primary:hover {
  @apply transform scale-105 shadow-lg;
}

.btn-primary:active {
  @apply transform scale-95;
}
```

## Accessibility Features

### Keyboard Navigation

```jsx
function KeyboardNavigation() {
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Handle keyboard shortcuts
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case 'k':
            event.preventDefault();
            // Open search modal
            break;
          case '/':
            event.preventDefault();
            // Focus search input
            break;
          // Add more shortcuts
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
}
```

### Screen Reader Support

```jsx
function AccessibleTable() {
  return (
    <Table role="table" aria-label="Users table">
      <TableHeader>
        <TableRow role="row">
          <TableHead role="columnheader" aria-sort="none">
            Username
          </TableHead>
          {/* Other headers */}
        </TableRow>
      </TableHeader>
      <TableBody role="rowgroup">
        {users.map((user) => (
          <TableRow key={user.id} role="row">
            <TableCell role="gridcell">
              <span id={`user-${user.id}-name`}>{user.username}</span>
            </TableCell>
            {/* Other cells */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

## Performance Optimizations

### Code Splitting

```jsx
const UsersPage = lazy(() => import('./pages/UsersPage'));
const TransactionsPage = lazy(() => import('./pages/TransactionsPage'));

function AdminRoutes() {
  return (
    <Routes>
      <Route path="users" element={
        <Suspense fallback={<PageSkeleton />}>
          <UsersPage />
        </Suspense>
      } />
      <Route path="transactions" element={
        <Suspense fallback={<PageSkeleton />}>
          <TransactionsPage />
        </Suspense>
      } />
    </Routes>
  );
}
```

### Data Fetching Optimization

```jsx
function useUsersData() {
  return useQuery({
    queryKey: ['users', filters],
    queryFn: () => fetchUsers(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    keepPreviousData: true,
  });
}
```

### Virtual Scrolling for Large Tables

```jsx
function VirtualizedTable({ data }) {
  const parentRef = useRef();

  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
  });

  return (
    <div ref={parentRef} className="h-96 overflow-auto">
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            <TableRow data={data[virtualItem.index]} />
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Error Boundaries

```jsx
class AdminErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to monitoring service
    console.error('Admin panel error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <Card className="p-8 text-center">
            <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
            <p className="text-muted-foreground mb-4">
              An error occurred in the admin panel. Please try refreshing the page.
            </p>
            <Button onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
```

## Testing Strategy

### Unit Tests

```jsx
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Integration Tests

```jsx
// UsersTable.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UsersTable } from './UsersTable';

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

describe('UsersTable', () => {
  it('displays users data', async () => {
    const queryClient = createTestQueryClient();
    
    render(
      <QueryClientProvider client={queryClient}>
        <UsersTable />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });
});
```

This comprehensive design specification provides everything needed to build a modern, beautiful, and functional admin panel for the Quotra financial platform using React, Tailwind CSS, and Shadcn/ui components.
