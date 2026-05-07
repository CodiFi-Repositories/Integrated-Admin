<template>
  <div class="p-4 h-full">

    <!-- Stat Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">

      <!-- Unique Users -->
      <div class="bg-white rounded-xl shadow-sm border-t-4 border border-gray-100"
        style="border-top-color: #ef4444;">
        <div class="p-4">
          <div class="flex items-start justify-between">
            <p class="text-gray-500 text-[10px] uppercase tracking-wider font-semibold m-0">SIP Details</p>
            <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style="background: #fef2f2;">
             <svg class="w-4 h-4" style="color:#f97316" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <div class="flex items-end gap-2">
            <span class="font-extrabold leading-none" style="font-size:28px;color:#ef4444">
              {{ summary.allActive.toLocaleString() }}
            </span>
            <span class="text-gray-300 mb-0.5 font-light" style="font-size:20px">/</span>
            <span class="font-semibold text-gray-400 leading-none mb-0.5" style="font-size:18px">
              {{ summary.allTotal.toLocaleString() }}
            </span>
          </div>
          <div class="mt-1 text-[11px] text-gray-500">
            <span class="font-semibold" style="color:#ef4444">Active</span>
            &nbsp;/&nbsp;
            <span class="text-gray-400">Total</span>
          </div>
        </div>
      </div>

      <!-- All Users -->
      <div class="bg-white rounded-xl shadow-sm border-t-4 border border-gray-100"
        style="border-top-color: #f97316;">
        <div class="p-4">
          <div class="flex items-start justify-between">
            <p class="text-gray-500 text-[10px] uppercase tracking-wider font-semibold m-0">User Details</p>
            <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style="background: #fff7ed;">
               <svg class="w-4 h-4" style="color:#ef4444" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <div class="flex items-end gap-2">
            <span class="font-extrabold leading-none" style="font-size:28px;color:#f97316">
              {{ summary.uniqueActive }}
            </span>
            <span class="text-gray-300 mb-0.5 font-light" style="font-size:20px">/</span>
            <span class="font-semibold text-gray-400 leading-none mb-0.5" style="font-size:18px">
              {{ summary.uniqueTotal }}
            </span>
          </div>
          <div class="mt-1 text-[11px] text-gray-500">
            <span class="font-semibold" style="color:#f97316">Active</span>
            &nbsp;/&nbsp;
            <span class="text-gray-400">Total</span>
          </div>
        </div>
      </div>

      <!-- Success / Failure -->
      <div class="bg-white rounded-xl shadow-sm border-t-4 border border-gray-100"
        style="border-top-color: #3b82f6;">
        <div class="p-4">
          <div class="flex items-start justify-between ">
            <p class="text-gray-500 text-[10px] uppercase tracking-wider font-semibold m-0">Success / Failure Ratio</p>
            <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style="background: #eff6ff;">
              <svg class="w-4 h-4" style="color:#3b82f6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div class="flex items-end gap-2">
            <span class="font-extrabold leading-none" style="font-size:28px;color:#3b82f6">
              {{ summary.success.toLocaleString() }}
            </span>
            <span class="text-gray-300 mb-0.5 font-light" style="font-size:20px">/</span>
            <span class="font-semibold text-gray-400 leading-none mb-0.5" style="font-size:18px">
              {{ summary.failure }}
            </span>
          </div>
          <div class="mt-1 flex items-center gap-2 text-[11px] text-gray-500">
            <span>
              <span class="font-semibold" style="color:#3b82f6">Success</span>
              &nbsp;/&nbsp;
              <span class="text-gray-400">Failure</span>
            </span> 
          </div>
        </div>
      </div>

      <!-- Frequency Breakdown -->
      <div class="bg-white rounded-xl shadow-sm border-t-4 border border-gray-100"
        style="border-top-color: #8b5cf6;">
        <div class="p-4 h-full flex flex-col justify-between">
          <p class="text-gray-400 text-[10px] font-semibold tracking-widest m-0">
            MONTHLY &middot; FORTNIGHTY &middot; WEEKLY &middot; DAILY
          </p>
          <div class="flex items-center justify-between gap-2">
            <div v-for="b in freqBreakdowns" :key="b.label" class="flex items-center gap-2">
              <!-- <div class="w-2.5 h-2.5 rounded-full flex-shrink-0" :style="{ background: b.color }"></div> -->
              <div>
                <div class="font-extrabold leading-none" style="font-size:22px" :style="{ color: b.color }">
                  {{ b.value }}
                </div>
                <div class="text-gray-400 text-[11px] mt-0.5">{{ b.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filter Tabs -->
    <div class="flex items-center mb-3">
      <div class="flex items-center bg-gray-100 rounded-full p-1 gap-0.5">
        <button v-for="f in filterTabs" :key="f" @click="setFilter(f)"
          class="px-5 py-1.5 rounded-full text-xs font-semibold transition-all"
          :class="activeFilter === f
            ? 'negativeBackground text-white shadow-sm'
            : 'text-gray-500 hover:text-gray-700'">
          {{ f }}
        </button>
      </div>
    </div>

    <sipOrderDialog :show="showDialog" :loading="dialogLoader" :executed="getSipOrderDetails?.executed || []"
      :upcoming="getSipOrderDetails?.upcoming || []" @close="closeDialog" />

    <!-- Table Section -->
    <div class="card border rounded bg-white shadow-sm">

      <!-- Toolbar -->
      <div class="flex items-center justify-between px-5 py-3 border-b border-gray-100">
        <div class="flex items-center gap-2">
          <div class="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
          <span class="text-sm font-bold text-gray-800">
            {{ activeFilter === 'Today' ? "Today's SIP Log Records" : 'SIP Log Records' }}
          </span>
          
        </div>
        <div class="flex items-center gap-2">
             <!-- Search -->
          <div class="relative">
            <svg class="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none"
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" v-model="search" placeholder="Search UserID"
              class="pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg outline-none text-xs w-36 focus:border-blue-400 focus:bg-white transition-all" />
          </div> 

        </div>
      </div>

      <!-- Filters (All tab only) -->
      <div v-if="activeFilter === 'All'" class="px-5 py-4 border-b border-gray-100">
        <div class="flex flex-wrap gap-4">
          <div>
            <label class="primaryColor pb-1 text-sm ml-2">User ID</label>
            <div class="flex items-center min-w-[160px] w-full h-10 border rounded p-2">
              <input v-model="userId" placeholder="Enter User ID"
                class="w-full h-9 ml-1 text-xs outline-none" />
            </div>
          </div>

          <div>
            <label class="primaryColor pb-1 text-sm ml-2">From Date</label>
            <VDatePicker :max-date="today" v-model="fromDate" @update:modelValue="onFromDateChange"
              is-required :popover="popover" :masks="{ input: 'DD/MM/YYYY', modelValue: 'DD/MM/YYYY' }" mode="date">
              <template v-slot="{ togglePopover, inputValue, inputEvents }">
                <div class="flex items-center justify-between min-w-[180px] h-10 border rounded cursor-pointer p-2">
                  <input :value="inputValue" placeholder="DD/MM/YYYY" v-on="inputEvents"
                    class="min-w-[130px] h-9 ml-1 text-xs outline-none cursor-pointer" readonly />
                  <button type="button" class="flex justify-center mr-2 items-center"
                    @click="() => togglePopover()">
                    <icons :name="'datePicker'" class="w-5" :color="'#ffffff'" />
                  </button>
                </div>
              </template>
            </VDatePicker>
          </div>

          <div>
            <label class="primaryColor pb-1 text-sm ml-2">To Date</label>
            <VDatePicker :min-date="fromDate" :max-date="today" v-model="toDate"
              is-required :popover="popover" :masks="{ input: 'DD/MM/YYYY', modelValue: 'DD/MM/YYYY' }" mode="date">
              <template v-slot="{ togglePopover, inputValue, inputEvents }">
                <div class="flex items-center justify-between min-w-[180px] h-10 border rounded cursor-pointer p-2">
                  <input :value="inputValue" placeholder="DD/MM/YYYY" v-on="inputEvents"
                    class="min-w-[130px] h-9 ml-1 text-xs outline-none cursor-pointer" readonly />
                  <button type="button" class="flex justify-center mr-2 items-center"
                    @click="() => togglePopover()">
                    <icons :name="'datePicker'" class="w-5" :color="'#ffffff'" />
                  </button>
                </div>
              </template>
            </VDatePicker>
          </div>

          <div class="flex flex-col">
            <label class="primaryColor pb-1 text-sm ml-2">Frequency</label>
            <select v-model="frequency"
              class="min-w-[160px] h-10 border rounded px-3 text-xs outline-none cursor-pointer">
              <option value="">All</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="fortnightly">Fortnightly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div class="flex flex-col">
            <label class="primaryColor pb-1 text-sm ml-2">Status</label>
            <select v-model="status"
              class="min-w-[160px] h-10 border rounded px-3 text-xs outline-none cursor-pointer">
              <option value="">All</option>
              <option value="Active">Active</option>
              <option value="Closed">Closed</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div class="flex gap-3 items-end">
            <button class="negativeBackground text-white h-10 w-[120px] cursor-pointer rounded text-xs"
              :disabled="getLoader" @click="handleSubmit()">
              <p v-if="!getLoader">Submit</p>
              <svg v-if="getLoader" class="animate-spin h-5 w-5 text-white flex mx-auto"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
            </button>
          </div>

          <div class="flex gap-3 items-end">
            <button v-if="getSipDetails?.length" type="button"
              class="negativeBackground text-white h-10 w-[120px] cursor-pointer rounded text-xs"
              @click="downloadUnicodeCSV(getSipDetails, 'SIP Logs', csvHeaders)">
              Download
            </button>
          </div>
        </div>
      </div>

      <!-- Table -->
      <template v-if="filteredData.length > 0">
      <div class="overflow-x-auto overflow-y-auto "
      :class="activeFilter === 'All' ? 'max-h-[calc(100vh-580px)]' : 'max-h-[calc(100vh-480px)]'">
        <table class="w-full">
          <!-- Unique User headers -->
          <thead v-if="activeFilter === 'Unique User'" class="sticky top-0 z-[1]">
            <tr style="background: #1e293b;">
              <th class="text-left px-4 py-3 text-white text-[11px] font-semibold tracking-wider whitespace-nowrap">Client Code</th>
              <th class="text-left px-4 py-3 text-white text-[11px] font-semibold tracking-wider whitespace-nowrap">Active SIP</th>
              <th class="text-left px-4 py-3 text-white text-[11px] font-semibold tracking-wider whitespace-nowrap">Total SIP</th>
              <th class="text-left px-4 py-3 text-white text-[11px] font-semibold tracking-wider whitespace-nowrap">Success Count</th>
              <th class="text-left px-4 py-3 text-white text-[11px] font-semibold tracking-wider whitespace-nowrap">Failure Count</th>
            </tr>
          </thead>
          <!-- Default headers -->
          <thead v-else class="sticky top-0 z-[1]">
            <tr style="background: #1e293b;">
              <th class="text-left px-4 py-3 text-white text-[11px] font-semibold tracking-wider whitespace-nowrap">Client Code</th>
              <th class="text-left px-4 py-3 text-white text-[11px] font-semibold tracking-wider">Symbol</th>
              <th class="text-left px-4 py-3 text-white text-[11px] font-semibold tracking-wider">Exchange</th>
              <th class="text-left px-4 py-3 text-white text-[11px] font-semibold tracking-wider">Frequency</th>
              <th class="text-left px-4 py-3 text-white text-[11px] font-semibold tracking-wider whitespace-nowrap">SIP Type</th>
              <th class="text-left px-4 py-3 text-white text-[11px] font-semibold tracking-wider whitespace-nowrap">SIP Amount</th>
              <th class="text-left px-4 py-3 text-white text-[11px] font-semibold tracking-wider whitespace-nowrap">SIP Quantity</th>
              <th class="text-left px-4 py-3 text-white text-[11px] font-semibold tracking-wider whitespace-nowrap">Cap Price</th>              
              <th class="text-left px-4 py-3 text-white text-[11px] font-semibold tracking-wider whitespace-nowrap">Start Date</th>
              <th class="text-left px-4 py-3 text-white text-[11px] font-semibold tracking-wider whitespace-nowrap">End Date</th>
              <th class="text-left px-4 py-3 text-white text-[11px] font-semibold tracking-wider">Installment</th>
              <th class="text-left px-4 py-3 text-white text-[11px] font-semibold tracking-wider whitespace-nowrap">Pending Installments</th>
              <th class="text-left px-4 py-3 text-white text-[11px] font-semibold tracking-wider whitespace-nowrap">Failed Installments</th>
              <th class="text-left px-4 py-3 text-white text-[11px] font-semibold tracking-wider whitespace-nowrap">Execution Count</th>
              <th class="text-left px-4 py-3 text-white text-[11px] font-semibold tracking-wider">Status</th>
              <th class="text-left px-4 py-3 text-white text-[11px] font-semibold tracking-wider whitespace-nowrap">Initiated By</th>
              <th class="text-left px-4 py-3 text-white text-[11px] font-semibold tracking-wider whitespace-nowrap">Modified By</th>
              <th class="text-left px-4 py-3 text-white text-[11px] font-semibold tracking-wider whitespace-nowrap">Created On</th>
            </tr>
          </thead>
          <!-- Unique User rows -->
          <tbody v-if="activeFilter === 'Unique User'">
            <tr v-for="(row, idx) in showData" :key="idx"
              class="border-b border-gray-50 transition-colors hover:bg-blue-50"
              :style="{ background: idx % 2 === 0 ? '#ffffff' : '#f9fafb' }">
              <td class="px-4 py-3 text-xs font-medium text-gray-700 whitespace-nowrap">{{ row.userId || "" }}</td>
              <td class="px-4 py-3 text-xs font-semibold cursor-pointer underline" style="color:#10b981" @click="openSipDetailDialog('active', row)">{{ row.activeSips }}</td>
              <td class="px-4 py-3 text-xs text-gray-700 cursor-pointer underline" @click="openSipDetailDialog('total', row)">{{ row.totalSips  }}</td>
              <td class="px-4 py-3 text-xs" style="color:#3b82f6">{{ row.successCount }}</td>
              <td class="px-4 py-3 text-xs" style="color:#ef4444">{{ row.failureCount }}</td>
            </tr>
            <tr v-if="showData.length === 0">
              <td colspan="5" class="text-center py-10 text-gray-400 text-xs">No records match the filter.</td>
            </tr>
          </tbody>
          <!-- Default rows -->
          <tbody v-else>
            <tr v-for="(row, idx) in showData" :key="idx"
              class="border-b border-gray-50 transition-colors hover:bg-blue-50 cursor-pointer"
              :style="{ background: idx % 2 === 0 ? '#ffffff' : '#f9fafb' }"
              @click="openDialog(row)">
              <td class="px-4 py-3 text-xs font-medium text-gray-700 whitespace-nowrap">{{ row.userId || "" }}</td>
              <td class="px-4 py-3 text-xs text-gray-700 whitespace-nowrap">{{ row.symbol || "" }}</td>
              <td class="px-4 py-3 text-xs text-gray-700">{{ row.exchange || "" }}</td>
              <td class="px-4 py-3 text-xs text-gray-700">{{ row.frequency || "" }}</td>
              <td class="px-4 py-3 text-xs text-gray-700">{{ row.sipType ? row.sipType == 'Quantity-wise' ? 'Quantity' :'Price' : "" }}</td>
              <td class="px-4 py-3 text-xs text-gray-700">{{ row.sipAmount ? parseFloat(row.sipAmount).toFixed(2) : "-" }}</td>
              <td class="px-4 py-3 text-xs text-gray-700">{{ row.sipQuantity || "" }}</td>
              <td class="px-4 py-3 text-xs text-gray-700">{{ row.capPrice ? parseFloat(row.capPrice).toFixed(2) : "-" }}</td>
              
              <td class="px-4 py-3 text-xs text-gray-700 whitespace-nowrap">
                {{ row.startDate ? new Date(row.startDate).toLocaleDateString("en-GB") : "" }}
              </td>
              <td class="px-4 py-3 text-xs text-gray-700 whitespace-nowrap">
                {{ row.endDate ? new Date(row.endDate).toLocaleDateString("en-GB") : "" }}
              </td>
              <td class="px-4 py-3 text-xs text-gray-700">{{ row.duration || "" }}</td>
              <td class="px-4 py-3 text-xs text-gray-700 text-center">{{ row.pendingInstallments ?? "" }}</td>
              <td class="px-4 py-3 text-xs text-gray-700 text-center">{{ row.failedInstallments ?? "" }}</td>
              <td class="px-4 py-3 text-xs text-gray-700 text-center">{{ row.executionCount ?? "" }}</td>
              <td class="px-4 py-3">
                <span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
                  :class="row.sipStatus === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'">
                  {{ row.sipStatus || "" }}
                </span>
              </td>
              <td class="px-4 py-3 text-xs text-gray-700">{{ row.initiatedBy || "" }}</td>
              <td class="px-4 py-3 text-xs text-gray-700">{{ row.modifiedBy || "" }}</td>
              <td class="px-4 py-3 text-xs text-gray-700 whitespace-nowrap">
                {{ row.createdAt ? new Date(row.createdAt).toLocaleDateString("en-GB") : "" }}
              </td>
            </tr>
            <tr v-if="showData.length === 0">
              <td colspan="18" class="text-center py-10 text-gray-400 text-xs">No records match the filter.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Footer -->
      <div class="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
        <span class="text-gray-400 text-xs">
          Showing {{ showData.length }} of {{ filteredData.length }} records
        </span>
        <commonPagination v-on:page-chg="getTableData"
          :tot-len="filteredData.length" :page-date="rowsPerPage" :row-count="rowsCount" />
      </div>
      </template>
    </div>

    <noData v-if="activeFilter === 'All' && submitted && getSipDetails?.length === 0" />

    <!-- SIP Detail Dialog -->
    <div v-if="showSipDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40" @click.self="closeSipDetailDialog">
      <div class="bg-white rounded-xl shadow-xl flex flex-col" style="width:90vw;max-width:1100px;max-height:80vh">
        <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <div class="flex items-center gap-2">
            <div class="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
            <span class="text-sm font-bold text-gray-800">{{ sipDialogTitle }}{{ getSipDialogDetails && getSipDialogDetails.lenght > 1 ?`'s`:'' }}</span>
          </div>
          <button @click="closeSipDetailDialog" class="text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="overflow-auto flex-1">
          <div v-if="sipDialogLoader" class="flex justify-center items-center py-12">
            <svg class="animate-spin h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <table v-else class="w-full">
            <thead class="sticky top-0 z-10">
              <tr style="background: #1e293b;">
                <th class="text-left px-4 py-3 text-white text-[11px] font-semibold tracking-wider whitespace-nowrap">Client Code</th>
                <th class="text-left px-4 py-3 text-white text-[11px] font-semibold tracking-wider whitespace-nowrap">Symbol</th>
                <th class="text-left px-4 py-3 text-white text-[11px] font-semibold tracking-wider">Exchange</th>
                <th class="text-left px-4 py-3 text-white text-[11px] font-semibold tracking-wider">Frequency</th>
                <th class="text-left px-4 py-3 text-white text-[11px] font-semibold tracking-wider whitespace-nowrap">SIP Type</th>
                <th class="text-left px-4 py-3 text-white text-[11px] font-semibold tracking-wider whitespace-nowrap">SIP Amount</th>
                <th class="text-left px-4 py-3 text-white text-[11px] font-semibold tracking-wider whitespace-nowrap">SIP Quantity</th>
                <th class="text-left px-4 py-3 text-white text-[11px] font-semibold tracking-wider whitespace-nowrap">Cap Price</th>
                <th class="text-left px-4 py-3 text-white text-[11px] font-semibold tracking-wider whitespace-nowrap">Start Date</th>
                <th class="text-left px-4 py-3 text-white text-[11px] font-semibold tracking-wider whitespace-nowrap">End Date</th>
                <th class="text-left px-4 py-3 text-white text-[11px] font-semibold tracking-wider">Installment</th>
                <th class="text-left px-4 py-3 text-white text-[11px] font-semibold tracking-wider whitespace-nowrap">Pending Installments</th>
                <th class="text-left px-4 py-3 text-white text-[11px] font-semibold tracking-wider whitespace-nowrap">Failed Installments</th>
                <th class="text-left px-4 py-3 text-white text-[11px] font-semibold tracking-wider whitespace-nowrap">Execution Count</th>
                <th class="text-left px-4 py-3 text-white text-[11px] font-semibold tracking-wider">Status</th>
                <th class="text-left px-4 py-3 text-white text-[11px] font-semibold tracking-wider whitespace-nowrap">Initiated By</th>
                <th class="text-left px-4 py-3 text-white text-[11px] font-semibold tracking-wider whitespace-nowrap">Modified By</th>
                <th class="text-left px-4 py-3 text-white text-[11px] font-semibold tracking-wider whitespace-nowrap">Created On</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, idx) in getSipDialogDetails" :key="(idx as number)"
                class="border-b border-gray-50 hover:bg-blue-50"
                :style="{ background: (idx as number) % 2 === 0 ? '#ffffff' : '#f9fafb' }">
                <td class="px-4 py-3 text-xs font-medium text-gray-700 whitespace-nowrap">{{ row.userId || "" }}</td>
                <td class="px-4 py-3 text-xs text-gray-700 whitespace-nowrap">{{ row.symbol || "" }}</td>
                <td class="px-4 py-3 text-xs text-gray-700">{{ row.exchange || "" }}</td>
                <td class="px-4 py-3 text-xs text-gray-700">{{ row.frequency || "" }}</td>
                <td class="px-4 py-3 text-xs text-gray-700">{{ row.sipType ? row.sipType == 'Quantity-wise' ? 'Quantity' :'Price' : "" }}</td>
                <td class="px-4 py-3 text-xs text-gray-700">{{ row.sipAmount ? parseFloat(row.sipAmount).toFixed(2) : "-" }}</td>
                <td class="px-4 py-3 text-xs text-gray-700">{{ row.sipQuantity || "" }}</td>
                <td class="px-4 py-3 text-xs text-gray-700">{{ row.capPrice ? parseFloat(row.capPrice).toFixed(2) : "-" }}</td>
                <td class="px-4 py-3 text-xs text-gray-700 whitespace-nowrap">{{ row.startDate ? new Date(row.startDate).toLocaleDateString("en-GB") : "" }}</td>
                <td class="px-4 py-3 text-xs text-gray-700 whitespace-nowrap">{{ row.endDate ? new Date(row.endDate).toLocaleDateString("en-GB") : "" }}</td>
                <td class="px-4 py-3 text-xs text-gray-700">{{ row.duration || "" }}</td>
                <td class="px-4 py-3 text-xs text-gray-700">{{ row.pendingInstallments ?? "" }}</td>
                <td class="px-4 py-3 text-xs text-gray-700">{{ row.failedInstallments ?? "" }}</td>
                <td class="px-4 py-3 text-xs text-gray-700">{{ row.executionCount ?? "" }}</td>
                <td class="px-4 py-3">
                  <span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
                    :class="row.sipStatus === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'">
                    {{ row.sipStatus || "" }}
                  </span>
                </td>
                <td class="px-4 py-3 text-xs text-gray-700">{{ row.initiatedBy || "" }}</td>
                <td class="px-4 py-3 text-xs text-gray-700">{{ row.modifiedBy || "" }}</td>
                <td class="px-4 py-3 text-xs text-gray-700 whitespace-nowrap">{{ row.createdAt ? new Date(row.createdAt).toLocaleDateString("en-GB") : "" }}</td>
              </tr>
              <tr v-if="!getSipDialogDetails?.length">
                <td colspan="18" class="text-center py-10 text-gray-400 text-xs">No records found.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters } from "vuex";
import commonFunc from "../../mixins/commonFunc";
import noData from "../../components/no-data.vue";
import Icons from "../../components/icons.vue";
import commonPagination from "../../components/commonPagination.vue";
import sipOrderDialog from "./sipOrderDialog.vue";

export default defineComponent({
  components: { noData, Icons, commonPagination, sipOrderDialog },
  mixins: [commonFunc],
  name: "sipLogs",
  setup() {
    const currentDate = new Date();
    const today = currentDate.toISOString().slice(0, 10);
    const defaultFromDate = new Date(currentDate);
    defaultFromDate.setMonth(defaultFromDate.getMonth() - 1);
    const userId = ref("");
    const fromDate = ref(defaultFromDate.toISOString().slice(0, 10));
    const toDate = ref(today);
    const frequency = ref("");
    const status = ref("");
    const defaultCreatedFrom = new Date(currentDate);
    defaultCreatedFrom.setMonth(defaultCreatedFrom.getMonth() - 1);
    const createdOnFrom = ref(defaultCreatedFrom.toISOString().slice(0, 10));
    const createdOnTo = ref(today);
    const search = ref("");
    const activeFilter = ref("Today");
    const filterTabs = ["Today", "Unique User", "All"];
    // "Today", 
    const submitted = ref(false);
    const pageOffset = ref(0);
    const rowsCount = ref(10);
    const showData = ref<any[]>([]);
    const popover = ref({ visibility: "click", placement: "bottom-start" });
    const showDialog = ref(false);
    const dialogLoader = ref(false);
    const showSipDialog = ref(false);
    const sipDialogTitle = ref("");
    const sipDialogLoader = ref(false);

    const csvHeaders = ref([
      { name: "Client Code", csvKey: "userId" },
      { name: "Symbol", csvKey: "symbol" },
      { name: "Exchange", csvKey: "exchange" },
      { name: "Frequency", csvKey: "frequency" },
      { name: "SIP Type", csvKey: "sipType" },
      { name: "SIP Amount", csvKey: "sipAmount" },
      { name: "SIP Quantity", csvKey: "sipQuantity" },
      { name: "Cap Price", csvKey: "capPrice" },
      { name: "Installment", csvKey: "duration" },
      { name: "Start Date", csvKey: "startDate" },
      { name: "End Date", csvKey: "endDate" },
      { name: "Execution Count", csvKey: "executionCount" },
      { name: "Pending Installments", csvKey: "pendingInstallments" },
      { name: "Failed Installments", csvKey: "failedInstallments" },
      { name: "Status", csvKey: "sipStatus" },
      { name: "Initiated By", csvKey: "initiatedBy" },
      { name: "Modified By", csvKey: "modifiedBy" },
      { name: "Created On", csvKey: "createdAt" },
    ]);
    const rowsPerPage = ref([
      { id: 0, option: 10 },
      { id: 1, option: 20 },
      { id: 2, option: 30 },
      { id: 3, option: 50 },
      { id: 4, option: 100 },
    ]);

    return {
      today, userId, fromDate, toDate, frequency, status, createdOnFrom, createdOnTo,
      search, activeFilter, filterTabs, submitted, pageOffset,
      rowsCount, showData, popover,
      showDialog, dialogLoader,
      showSipDialog, sipDialogTitle, sipDialogLoader,
      csvHeaders, rowsPerPage,
    };
  },
  computed: {
    ...mapGetters("reports", ["getSipDetails", "getLoader", "getSipOrderDetails", "getSipCountDetails", "getUserSipDetails", "getSipDialogDetails"]),

    summary(): any {
      const d = (this as any).getSipCountDetails;
      return {
        uniqueActive: d?.activeUsers ?? 0,
        uniqueTotal: d?.totalUsers ?? 0,
        allActive: d?.activeSips ?? 0,
        allTotal: d?.totalSips ?? 0,
        success: d?.successCount ?? 0,
        failure: d?.failureCount ?? 0,
        freqData: {
          Monthly: d?.monthlyCount ?? 0,
          Weekly: d?.weeklyCount ?? 0,
          Fortnightly: d?.fortnightyCount ?? 0,
          Daily: d?.dailyCount ?? 0,
        },
      };
    },

    freqBreakdowns(): { label: string; value: number; color: string }[] {
      const f = (this as any).summary.freqData;
      return [
        { label: "Monthly",     value: f.Monthly,     color: "#8b5cf6" },
        { label: "Fortnightly", value: f.Fortnightly, color: "#f59e0b" },
        { label: "Weekly",      value: f.Weekly,      color: "#06b6d4" },
        { label: "Daily",       value: f.Daily,       color: "#10b981" },
      ];
    },

    filteredData(): any[] {
      let data: any[] = (this as any).getSipDetails || [];

      if ((this as any).activeFilter === "Today") {
        const todayStr = new Date().toDateString();
        data = data.filter((r: any) => r.createdAt && new Date(r.createdAt).toDateString() === todayStr);
      } else if ((this as any).activeFilter === "Unique User") {
        data = (this as any).getUserSipDetails || [];
      }

      const q = ((this as any).search || "").toLowerCase().trim();
      if (!q) return data;
      return data.filter((r: any) =>
        (r.userId || "").toLowerCase().includes(q) ||
        (r.symbol || "").toLowerCase().includes(q) ||
        (r.exchange || "").toLowerCase().includes(q) ||
        (r.frequency || "").toLowerCase().includes(q) ||
        (r.sipStatus || "").toLowerCase().includes(q)
      );
    },
  },
  watch: {
    filteredData(val: any[]) {
      this.pageOffset = 0;
      const last = typeof this.rowsCount === "number" ? this.rowsCount : val.length;
      this.showData = val.slice(0, last);
    },
  },
  methods: {
    openDialog(row: any) {
      this.showDialog = true;
      this.dialogLoader = true;
      this.$store.dispatch("reports/getSipOrderDetails", row.id).finally(() => {
        this.dialogLoader = false;
      });
    },

    closeDialog() {
      this.showDialog = false;
      this.$store.commit("reports/setSipOrderDetails", { executed: [], upcoming: [] });
    },

    setFilter(f: string) { 
      this.activeFilter = f;
      this.pageOffset = 0;
      if (f === 'Today') {
        this.userId = '';
        this.frequency = '';
        this.status = '';
        this.fromDate = '';
        this.toDate = this.today;
        this.createdOnFrom = this.today;
        this.createdOnTo = this.today;
        this.handleSubmit();
        return;
      }
      if (f === 'All') {
        this.userId = '';
        this.frequency = '';
        this.status = '';
        const oneMonthBefore = new Date(this.today);
        oneMonthBefore.setMonth(oneMonthBefore.getMonth() - 1);
        this.fromDate = oneMonthBefore.toISOString().slice(0, 10);
        this.toDate = this.today;
        this.handleSubmit();
        return;
      }
      if (f === 'Unique User') {
        this.$store.dispatch("reports/getUserSipDetails").finally(() => {
          const last = typeof this.rowsCount === "number" ? this.rowsCount : (this as any).filteredData.length;
          this.showData = (this as any).filteredData.slice(0, last);
        });
        return;
      }
      const last = typeof this.rowsCount === "number" ? this.rowsCount : (this as any).filteredData.length;
      this.showData = (this as any).filteredData.slice(0, last);
    },

    onFromDateChange(val: string) {
      if (this.toDate && val > this.toDate) this.toDate = val;
    },

    getTableData(data: any) {
      this.rowsCount = data.count;
      this.pageOffset = data.from;
      const last = data.last === "" ? (this as any).filteredData.length : data.last;
      this.showData = (this as any).filteredData.slice(data.from, last);
    },

    openSipDetailDialog(type: 'active' | 'total', data: any) {
      if (type === 'active' && !(data.activeSips > 0)) {
        this.$notify({ group: 'auth', type: 'error', title: 'No Active SIPs for this user' });
        return;
      }
      if (type === 'total' && !(data.totalSips > 0)) {
        this.$notify({ group: 'auth', type: 'error', title: 'No Total SIPs for this user' });
        return;
      }
      this.sipDialogTitle = type === 'active' ? 'Active SIP' : 'Total SIP';
      this.showSipDialog = true;
      this.sipDialogLoader = true;
      this.$store.commit('reports/setSipDialogDetails', []);
      const payload = type === 'active'
        ? { userId: data.userId, startDate: '', endDate: (window as any).formatDate(new Date(this.today), 'D'), frequency: '', sipStatus: 'Active' }
        : { userId: data.userId, startDate: '', endDate: (window as any).formatDate(new Date(this.today), 'D'), frequency: '', sipStatus: '' };
      this.$store.dispatch('reports/getSipDialogDetails', payload).finally(() => {
        this.sipDialogLoader = false;
      });
    },

    closeSipDetailDialog() {
      this.showSipDialog = false;
      this.$store.commit('reports/setSipDialogDetails', []);
    },

    handleSubmit() {
      if (this.activeFilter !== 'Today' && (!this.fromDate || !this.toDate)) {
        this.$notify({ group: "auth", type: "error", title: "Select a From Date and To Date" });
        return;
      }
      const json: any = {
        userId: this.userId,
        frequency: this.frequency,
        sipStatus: this.status,
      };
      if (this.fromDate && this.activeFilter !== 'Today') json.startDate = (window as any).formatDate(new Date(this.fromDate), 'D');
      if (this.toDate) json.endDate = (window as any).formatDate(new Date(this.toDate), 'D');
      if (this.createdOnFrom) json.createdOnFrom = (window as any).formatDate(new Date(this.createdOnFrom), 'D');
      if (this.createdOnTo) json.createdOnTo = (window as any).formatDate(new Date(this.createdOnTo), 'D');
      this.$store.dispatch("reports/getSipDetails", json).finally(() => {
        this.submitted = true;
        this.getTableData({ from: 0, last: this.rowsCount, count: this.rowsCount });
      });
    },
  },
  mounted() {
    this.$store.dispatch("reports/getSipCountDetails");
    this.setFilter('Today')
  },
  unmounted() {
    this.$store.commit("reports/setSipDetails", []);
    this.$store.commit("reports/setSipCountDetails", null);
    this.$store.commit("reports/setSipDialogDetails", []);
  },
});
</script>
