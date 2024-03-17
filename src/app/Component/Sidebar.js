
"use client";
import React from 'react';
import Link from "next/link";
import List from "@mui/material/List";
import {usePathname} from "next/navigation";
import { ListItem, ListItemIcon, ListItemText} from "@mui/material";
import MailIcon from '@mui/icons-material/Mail';
import CollapsibleItem from "@/app/Component/CollapsibleItem";

function InboxIcon() {
    return null;
}

function Sidebar() {
    const pathName = usePathname();
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <div className="sidebar">
                <nav className="mt-2">
                    <Link href="/dashboard">
                        <ListItem button className="nav text-white">
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="DashBoard" />
                        </ListItem>
                    </Link>
                    <Link href="/Sell">
                        <ListItem button className="nav text-white">
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Sell" />
                        </ListItem>
                    </Link>
                    <Link href="/Purchase">
                        <ListItem button className="nav text-white">
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Purchase" />
                        </ListItem>
                    </Link>
                    <CollapsibleItem icon={<InboxIcon />} primary="Account">
                        <List component="div" disablePadding>
                            <Link href="/Account/List">
                                <ListItem button className={`nav-item text-white ${pathName === '/Account/List' ? 'active' : ''}`} sx={{ '&:hover': { backgroundColor: '#03b629' } }}>
                                    <ListItemIcon>
                                        <MailIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Account List" />
                                </ListItem>
                            </Link>
                            <Link href="/Account/Add">
                                <ListItem button className={`nav-item text-white ${pathName === '/Account/Add' ? 'active' : ''}`} sx={{ '&:hover': { backgroundColor: '#03b629' } }}>
                                    <ListItemIcon>
                                        <MailIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="New Account" />
                                </ListItem>
                            </Link>
                            <Link href="/Account/Transfer">
                                <ListItem button className={`nav-item text-white ${pathName === '/Account/Transfer' ? 'active' : ''}`} sx={{ '&:hover': { backgroundColor: '#03b629' } }}>
                                    <ListItemIcon>
                                        <MailIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Balance transfer" />
                                </ListItem>
                            </Link>
                            <Link href="/Account/CashDeclare">
                                <ListItem button className={`nav-item text-white ${pathName === '/Account/CashDeclare' ? 'active' : ''}`} sx={{ '&:hover': { backgroundColor: '#03b629' } }}>
                                    <ListItemIcon>
                                        <MailIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Cash Declare" />
                                </ListItem>
                            </Link>
                        </List>
                    </CollapsibleItem>
                        <CollapsibleItem icon={<InboxIcon />} primary="Customer">
                            <List component="div" disablePadding>
                                <Link href="/Customer/AddCustomer">
                                    <ListItem button className={`nav-item text-white ${pathName === '/Customer/AddCustomer' ? 'active' : ''}`} sx={{ '&:hover': { backgroundColor: '#03b629' } }}>
                                        <ListItemIcon>
                                            <MailIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Add Customer" />
                                    </ListItem>
                                </Link>
                                <Link href="/Customer/CustomerList">
                                    <ListItem button className={`nav-item text-white ${pathName === '/Customer/CustomerList' ? 'active' : ''}`} sx={{ '&:hover': { backgroundColor: '#03b629' } }}>
                                        <ListItemIcon>
                                            <MailIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Customer List" />
                                    </ListItem>
                                </Link>
                                <Link href="/Customer/DueCollection">
                                    <ListItem button className={`nav-item text-white ${pathName === '/Customer/DueCollection' ? 'active' : ''}`} sx={{ '&:hover': { backgroundColor: '#03b629' } }}>
                                        <ListItemIcon>
                                            <MailIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Due Collection" />
                                    </ListItem>
                                </Link>
                                <Link href="/Customer/Ledger">
                                    <ListItem button className={`nav-item text-white ${pathName === '/Customer/Ledger' ? 'active' : ''}`} sx={{ '&:hover': { backgroundColor: '#03b629' } }}>
                                        <ListItemIcon>
                                            <MailIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Customer Ledger" />
                                    </ListItem>
                                </Link>
                            </List>
                        </CollapsibleItem>
                    <CollapsibleItem icon={<InboxIcon />} primary="Vendor">
                        <List component="div" disablePadding>
                            <Link href="/Vendor/AddVendor">
                                <ListItem button className={`nav-item text-white ${pathName === '/Vendor/AddVendor' ? 'active' : ''}`} sx={{ '&:hover': { backgroundColor: '#03b629' } }}>
                                    <ListItemIcon>
                                        <MailIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Add Vendor" />
                                </ListItem>
                            </Link>
                            <Link href="/Vendor/VendorList">
                                <ListItem button className={`nav-item text-white ${pathName === '/Vendor/VendorList' ? 'active' : ''}`} sx={{ '&:hover': { backgroundColor: '#03b629' } }}>
                                    <ListItemIcon>
                                        <MailIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Vendor List" />
                                </ListItem>
                            </Link>
                            <Link href="/Vendor/DebtPay">
                                <ListItem button className={`nav-item text-white ${pathName === '/Vendor/DebtPay' ? 'active' : ''}`} sx={{ '&:hover': { backgroundColor: '#03b629' } }}>
                                    <ListItemIcon>
                                        <MailIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Debt Pay" />
                                </ListItem>
                            </Link>
                        </List>
                    </CollapsibleItem>
                    <CollapsibleItem icon={<InboxIcon />} primary="Product">
                        <List component="div" disablePadding>
                            <Link href="/Product/Add">
                                <ListItem button className={`nav-item text-white ${pathName === '/Product/Add' ? 'active' : ''}`} sx={{ '&:hover': { backgroundColor: '#03b629' } }}>
                                    <ListItemIcon>
                                        <MailIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="New Product" />
                                </ListItem>
                            </Link>
                            <Link href="/Product/Stock">
                                <ListItem button className={`nav-item text-white ${pathName === '/Product/Stock' ? 'active' : ''}`} sx={{ '&:hover': { backgroundColor: '#03b629' } }}>
                                    <ListItemIcon>
                                        <MailIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Product Stock" />
                                </ListItem>
                            </Link>
                            <CollapsibleItem icon={<InboxIcon />} primary="Category">
                                <List component="div" disablePadding>
                                    <Link href="/Product/Category/Add">
                                        <ListItem button className={`nav-item text-white ${pathName === '/Product/Category/Add' ? 'active' : ''}`} sx={{ '&:hover': { backgroundColor: '#03b629' } }}>
                                            <ListItemIcon>
                                                <MailIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="New Category" />
                                        </ListItem>
                                    </Link>
                                    <Link href="/Product/Category/List">
                                        <ListItem button className={`nav-item text-white ${pathName === '/Product/Category/List' ? 'active' : ''}`} sx={{ '&:hover': { backgroundColor: '#03b629' } }}>
                                            <ListItemIcon>
                                                <MailIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Category List" />
                                        </ListItem>
                                    </Link>
                                </List>
                            </CollapsibleItem>
                            <CollapsibleItem icon={<InboxIcon />} primary="Brand">
                                <List component="div" disablePadding>
                                    <Link href="/Product/Brand/Add">
                                        <ListItem button className={`nav-item text-white ${pathName === '/Product/Brand/Add' ? 'active' : ''}`} sx={{ '&:hover': { backgroundColor: '#03b629' } }}>
                                            <ListItemIcon>
                                                <MailIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="New Brand" />
                                        </ListItem>
                                    </Link>
                                    <Link href="/Product/Brand/List">
                                        <ListItem button className={`nav-item text-white ${pathName === '/Product/Brand/List' ? 'active' : ''}`} sx={{ '&:hover': { backgroundColor: '#03b629' } }}>
                                            <ListItemIcon>
                                                <MailIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Brand List" />
                                        </ListItem>
                                    </Link>
                                </List>
                            </CollapsibleItem>
                            <CollapsibleItem icon={<InboxIcon />} primary="Unit">
                                <List component="div" disablePadding>
                                    <Link href="/Product/Unit/Add">
                                        <ListItem button className={`nav-item text-white ${pathName === '/Product/Unit/Add' ? 'active' : ''}`} sx={{ '&:hover': { backgroundColor: '#03b629' } }}>
                                            <ListItemIcon>
                                                <MailIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="New Unit" />
                                        </ListItem>
                                    </Link>
                                    <Link href="/Product/Unit/List">
                                        <ListItem button className={`nav-item text-white ${pathName === '/Product/Unit/List' ? 'active' : ''}`} sx={{ '&:hover': { backgroundColor: '#03b629' } }}>
                                            <ListItemIcon>
                                                <MailIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Unit List" />
                                        </ListItem>
                                    </Link>
                                </List>
                            </CollapsibleItem>
                        </List>
                    </CollapsibleItem>
                    <CollapsibleItem icon={<InboxIcon />} primary="Expenses">
                        <List component="div" disablePadding>
                            <Link href="/Expense">
                                <ListItem button className={`nav-item text-white ${pathName === '/Expense' ? 'active' : ''}`} sx={{ '&:hover': { backgroundColor: '#03b629' } }}>
                                    <ListItemIcon>
                                        <MailIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Add Expenses" />
                                </ListItem>
                            </Link>
                            <Link href="/Expense/List">
                                <ListItem button className={`nav-item text-white ${pathName === '/Expense/List' ? 'active' : ''}`} sx={{ '&:hover': { backgroundColor: '#03b629' } }}>
                                    <ListItemIcon>
                                        <MailIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Expense List" />
                                </ListItem>
                            </Link>
                            <Link href="/Expense/Account">
                                <ListItem button className={`nav-item text-white ${pathName === '/Expense/Account' ? 'active' : ''}`} sx={{ '&:hover': { backgroundColor: '#03b629' } }}>
                                    <ListItemIcon>
                                        <MailIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Expense Account" />
                                </ListItem>
                            </Link>
                        </List>
                    </CollapsibleItem>
                    <CollapsibleItem icon={<InboxIcon />} primary="Report">
                        <List component="div" disablePadding>
                            <Link href="/Report/SoldProductList">
                                <ListItem button className={`nav-item text-white ${pathName === '/Report/SoldProductList' ? 'active' : ''}`} sx={{ '&:hover': { backgroundColor: '#03b629' } }}>
                                    <ListItemIcon>
                                        <MailIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Sold Product" />
                                </ListItem>
                            </Link>
                            <Link href="/Report/BalanceChart">
                                <ListItem button className={`nav-item text-white ${pathName === '/Report/BalanceChart' ? 'active' : ''}`} sx={{ '&:hover': { backgroundColor: '#03b629' } }}>
                                    <ListItemIcon>
                                        <MailIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Balance Chart" />
                                </ListItem>
                            </Link>
                        </List>
                    </CollapsibleItem>
                </nav>
            </div>
        </aside>
    );
}

export default Sidebar;
