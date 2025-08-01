import SidebarItem from './SidebarItem';
import SidebarSection from './SidebarSection';
import { useState } from 'react';
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
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';

export default function Sidebar({user}) {
    const isAdmin = user?.role === 'admin';
    const isSalesman = user?.role === 'salesman';
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (name) => {
        setOpenSection((prev) => (prev === name ? null : name));
    };

    return (
        <aside className="main-sidebar elevation-4 w-64 bg-[#119fb9] min-h-screen p-3">
            <div className="h-full overflow-y-auto pr-2">
            {isAdmin && (
                <>
            <nav className="space-y-2">
                <SidebarItem href="/dashboard" icon={DashboardIcon} label="Dashboard" />
                <SidebarItem href="/Sell/PendingList" icon={PendingActionsIcon} label="Pending Transections" />
                <SidebarItem href="/Sell" icon={ShoppingCartIcon} label="Sell" />
                <SidebarItem href="/Purchase" icon={ShoppingBagIcon} label="Purchase" />

                <SidebarSection
                    icon={AccountBalanceIcon}
                    title="Account"
                    isOpen={openSection === 'account'}
                    onToggle={() => toggleSection('account')}
                >
                    <SidebarItem href="/Account/List"  label="Account List" />
                    <SidebarItem href="/Account/Add" label="New Account" />
                    <SidebarItem href="/Account/Transfer"  label="Balance Transfer" />
                    <SidebarItem href="/Account/CashDeclare"  label="Cash Declare" />
                    <SidebarItem href="/Account/CashPickUp"  label="Cash Pick Up" />
                </SidebarSection>

                <SidebarSection
                    icon={PeopleIcon}
                    title="Customer"
                    isOpen={openSection === 'customer'}
                    onToggle={() => toggleSection('customer')}
                >
                    <SidebarItem href="/Customer/AddCustomer" label="Add Customer" />
                    <SidebarItem href="/Customer/CustomerList"  label="Customer List" />
                    <SidebarItem href="/Customer/DueCollection"  label="Due Collection" />
                    <SidebarItem href="/Customer/Ledger" label="Customer Ledger" />
                </SidebarSection>

                <SidebarSection
                    icon={AccountBoxIcon}
                    title="Vendor"
                    isOpen={openSection === 'vendor'}
                    onToggle={() => toggleSection('vendor')}
                >
                    <SidebarItem href="/Vendor/AddVendor" label="Add Vendor" />
                    <SidebarItem href="/Vendor/VendorList" label="Vendor List" />
                    <SidebarItem href="/Vendor/DebtPay" label="Debt Pay" />
                    <SidebarItem href="/Vendor/Ledger" label="Vendor Ledger" />
                </SidebarSection>

                <SidebarSection
                    icon={Inventory2Icon}
                    title="Product"
                    isOpen={openSection === 'product'}
                    onToggle={() => toggleSection('product')}
                >
                    <SidebarItem href="/Product/Stock" label="Product Stock" />
                    <SidebarItem href="/Product/Add" label="New Product" />
                    <SidebarItem href="/Product/Category/Add" label="New Category" />
                    <SidebarItem href="/Product/Category/List" label="Category List" />
                    <SidebarItem href="/Product/Brand/Add" label="New Brand" />
                    <SidebarItem href="/Product/Unit/Add" label="New Unit" />
                    <SidebarItem href="/Product/Unit/List" label="Unit List" />
                </SidebarSection>

                <SidebarSection
                    icon={PaymentsIcon}
                    title="Expenses"
                    isOpen={openSection === 'expenses'}
                    onToggle={() => toggleSection('expenses')}
                >
                    <SidebarItem href="/Expense" label="Add Expenses" />
                    <SidebarItem href="/Expense/List" label="Expense List" />
                    <SidebarItem href="/Expense/Account" label="Expense Account" />
                </SidebarSection>

                <SidebarSection
                    icon={AssessmentIcon}
                    title="Report"
                    isOpen={openSection === 'reports'}
                    onToggle={() => toggleSection('reports')}
                >
                    <SidebarItem href="/Report/DailySummary" label="Daily Summary" />
                    <SidebarItem href="/Report/SoldProductList" label="Sold Product" />
                    <SidebarItem href="/Report/BalanceChart" label="Balance Chart" />
                </SidebarSection>
            </nav>
                </>)}
            {isSalesman && (
                <>
                    <nav className="space-y-2">
                        <SidebarItem href="/dashboard" icon={DashboardIcon} label="Dashboard" />
                        <SidebarItem href="/Sell" icon={ShoppingCartIcon} label="Sell" />
                        <SidebarSection
                            icon={PeopleIcon}
                            title="Customer"
                            isOpen={openSection === 'customer'}
                            onToggle={() => toggleSection('customer')}
                        >
                            <SidebarItem href="/Customer/AddCustomer" label="Add Customer" />
                            <SidebarItem href="/Customer/CustomerList" label="Customer List" />
                            <SidebarItem href="/Customer/DueCollection" label="Due Collection" />
                            <SidebarItem href="/Customer/Ledger" label="Customer Ledger" />
                        </SidebarSection>

                        <SidebarSection
                            icon={AssessmentIcon}
                            title="Report"
                            isOpen={openSection === 'report'}
                            onToggle={() => toggleSection('report')}
                        >
                            <SidebarItem href="/Report/DailySummary" label="Daily Summary" />
                            <SidebarItem href="/Report/SoldProductList" label="Sold Product" />
                            <SidebarItem href="/Report/BalanceChart" label="Balance Chart" />
                        </SidebarSection>
                    </nav>
                </>)}
            </div>
        </aside>
    );
}
