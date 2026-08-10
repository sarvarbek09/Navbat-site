"use client";

import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationEllipsis } from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { usersData } from '../lib/users-data';

const roleStyles: Record<string, string> = {
  Client: 'bg-slate-100 text-slate-600 font-semibold',
  Specialist: 'bg-violet-50 text-indigo-500 font-semibold',
  Owner: 'bg-orange-50 text-orange-600 font-semibold',
};

const statusStyles: Record<string, string> = {
  Active: 'bg-emerald-50 text-emerald-600 font-semibold',
  Blocked: 'bg-red-50 text-red-500 font-semibold',
};

export function UserManagementTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const totalEntries = 12450;

  const filteredUsers = useMemo(() => {
    return usersData.filter((user) => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [searchQuery, roleFilter, statusFilter]);

  return (
    <div className="w-full bg-white border border-accent rounded-md p-6">
      
      {/* TOOLBAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search users by name, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-10 border-gray-200 rounded-xl text-sm placeholder:text-gray-400 focus-visible:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[130px] h-10 border-gray-200 rounded-xl text-sm font-medium text-gray-700">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="Client">Client</SelectItem>
              <SelectItem value="Specialist">Specialist</SelectItem>
              <SelectItem value="Owner">Owner</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px] h-10 border-gray-200 rounded-xl text-sm font-medium text-gray-700">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Blocked">Blocked</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" className="h-10 w-10 border-gray-200 text-gray-500 rounded-xl hover:text-gray-900 shrink-0">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* TABLE */}
      <div className="border border-gray-100 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between bg-violet-50/40 border-b border-gray-100 px-6 py-3.5 text-[11px] font-extrabold text-slate-400 tracking-wider uppercase">
          <div className="w-[300px] shrink-0">User</div>
          <div className="w-[140px] shrink-0 px-4 text-center">Role</div>
          <div className="w-[140px] shrink-0 px-4 text-center">Status</div>
          <div className="flex-1 px-4">Joined Date</div>
          <div className="w-[100px] shrink-0 text-right">Actions</div>
        </div>

        <div className="divide-y divide-gray-50">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div 
                key={user.id} 
                className="flex items-center justify-between px-6 py-4 hover:bg-slate-50/20 transition-colors"
              >
                <div className="w-[300px] shrink-0 flex items-center gap-3">
                  {user.avatarUrl ? (
                    <img 
                      src={user.avatarUrl} 
                      alt={user.name} 
                      className="h-10 w-10 rounded-full object-cover bg-gray-50 border border-gray-100"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-slate-100 border border-gray-200 text-slate-400 flex items-center justify-center shrink-0">
                      <User className="h-5 w-5" />
                    </div>
                  )}
                  <div className="flex flex-col truncate">
                    <span className="font-bold text-gray-800 text-sm leading-tight">{user.name}</span>
                    <span className="text-xs text-gray-400 font-medium mt-0.5">{user.email}</span>
                  </div>
                </div>

                <div className="w-[140px] shrink-0 flex justify-center px-4">
                  <span className={`inline-flex items-center justify-center px-3 py-1 text-xs rounded-full min-w-[85px] text-center ${roleStyles[user.role] || 'bg-gray-100 text-gray-600'}`}>
                    {user.role}
                  </span>
                </div>

                <div className="w-[140px] shrink-0 flex justify-center px-4">
                  <span className={`inline-flex items-center justify-center px-3 py-1 text-xs rounded-full min-w-[75px] text-center ${statusStyles[user.status] || 'bg-gray-100 text-gray-600'}`}>
                    {user.status}
                  </span>
                </div>

                <div className="flex-1 text-gray-600 text-sm font-medium px-4">
                  {user.joinedDate}
                </div>

                <div className="w-[100px] shrink-0 text-right"></div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-sm text-gray-400 font-medium bg-white">
              No users found matching filters.
            </div>
          )}
        </div>
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-between pt-5 bg-white">
        <div className="text-sm font-medium text-slate-400">
          Showing 1 to {filteredUsers.length} of {totalEntries.toLocaleString('en-US')} results
        </div>

        <div>
          <Pagination>
            <PaginationContent className="gap-1">
              <PaginationItem>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 border-gray-200 text-gray-400 hover:text-gray-900 rounded-lg"
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </PaginationItem>

              {/* ИСПРАВЛЕНО: Правильный обход массива для номеров страниц */}
              {[1, 2, 3].map((pageNumber) => {
                const isActive = currentPage === pageNumber;
                return (
                  <PaginationItem key={pageNumber}>
                    <Button
                      variant={isActive ? "default" : "outline"}
                      className={`h-8 w-8 font-bold text-xs p-0 border-gray-200 rounded-lg ${
                        isActive 
                          ? "bg-indigo-600 hover:bg-indigo-700 text-white border-transparent" 
                          : "text-gray-700 hover:bg-gray-50 bg-white"
                      }`}
                      onClick={() => setCurrentPage(pageNumber)}
                    >
                      {pageNumber}
                    </Button>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationEllipsis className="h-8 w-8 text-gray-400 flex items-center justify-center" />
              </PaginationItem>

              <PaginationItem>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 border-gray-200 text-gray-400 hover:text-gray-900 rounded-lg"
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

    </div>
  );
}
