import SidebarItem from './SidebarItem';
import SidebarSection from './SidebarSection';

import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CircleIcon from '@mui/icons-material/RadioButtonUnchecked';
import PeopleIcon from '@mui/icons-material/People';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import InboxIcon from '@mui/icons-material/Inbox';
import PaymentsIcon from '@mui/icons-material/Payments';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';

export default function Sidebar() {
    return (
        <aside className="main-sidebar elevation-4 w-64 bg-[#119fb9] min-h-screen p-3">
            <nav className="space-y-2">
                <SidebarItem href="/dashboard" icon={DashboardIcon} label="Dashboard" />
                <SidebarItem href="/Sell" icon={ShoppingCartIcon} label="Sell" />
                <SidebarItem href="/Purchase" icon={ShoppingBagIcon} label="Purchase" />

                <SidebarSection icon={AccountBalanceIcon} title="Account">
                    <SidebarItem href="/Account/List"  label="Account List" />
                    <SidebarItem href="/Account/Add" label="New Account" />
                    <SidebarItem href="/Account/Transfer"  label="Balance Transfer" />
                    <SidebarItem href="/Account/CashDeclare"  label="Cash Declare" />
                </SidebarSection>

                <SidebarSection icon={PeopleIcon} title="Customer">
                    <SidebarItem href="/Customer/AddCustomer" icon={CircleIcon} label="Add Customer" />
                    <SidebarItem href="/Customer/CustomerList" icon={CircleIcon} label="Customer List" />
                    <SidebarItem href="/Customer/DueCollection" icon={CircleIcon} label="Due Collection" />
                    <SidebarItem href="/Customer/Ledger" icon={CircleIcon} label="Customer Ledger" />
                </SidebarSection>

                <SidebarSection icon={AccountBoxIcon} title="Vendor">
                    <SidebarItem href="/Vendor/AddVendor" icon={CircleIcon} label="Add Vendor" />
                    <SidebarItem href="/Vendor/VendorList" icon={CircleIcon} label="Vendor List" />
                    <SidebarItem href="/Vendor/DebtPay" icon={CircleIcon} label="Debt Pay" />
                    <SidebarItem href="/Vendor/Ledger" icon={CircleIcon} label="Vendor Ledger" />
                </SidebarSection>

                <SidebarSection icon={Inventory2Icon} title="Product">
                    <SidebarItem href="/Product/Add" icon={CircleIcon} label="New Product" />
                    <SidebarItem href="/Product/Stock" icon={CircleIcon} label="Product Stock" />
                    <SidebarSection icon={InboxIcon} title="Category">
                        <SidebarItem href="/Product/Category/Add" icon={CircleIcon} label="New Category" />
                        <SidebarItem href="/Product/Category/List" icon={CircleIcon} label="Category List" />
                    </SidebarSection>
                    <SidebarSection icon={InboxIcon} title="Brand">
                        <SidebarItem href="/Product/Brand/Add" icon={CircleIcon} label="New Brand" />
                        <SidebarItem href="/Product/Brand/List" icon={CircleIcon} label="Brand List" />
                    </SidebarSection>
                    <SidebarSection icon={InboxIcon} title="Unit">
                        <SidebarItem href="/Product/Unit/Add" icon={CircleIcon} label="New Unit" />
                        <SidebarItem href="/Product/Unit/List" icon={CircleIcon} label="Unit List" />
                    </SidebarSection>
                </SidebarSection>

                <SidebarSection icon={PaymentsIcon} title="Expenses">
                    <SidebarItem href="/Expense" icon={CircleIcon} label="Add Expenses" />
                    <SidebarItem href="/Expense/List" icon={CircleIcon} label="Expense List" />
                    <SidebarItem href="/Expense/Account" icon={CircleIcon} label="Expense Account" />
                </SidebarSection>

                <SidebarSection icon={AssessmentIcon} title="Report">
                    <SidebarItem href="/Report/DailySummary" icon={CircleIcon} label="Daily Summary" />
                    <SidebarItem href="/Report/SoldProductList" icon={CircleIcon} label="Sold Product" />
                    <SidebarItem href="/Report/BalanceChart" icon={CircleIcon} label="Balance Chart" />
                </SidebarSection>
            </nav>
        </aside>
    );
}
