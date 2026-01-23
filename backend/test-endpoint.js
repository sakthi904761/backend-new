#!/usr/bin/env node

import fetch from 'node-fetch';

const API_URL = 'http://localhost:4000/api/v1/email/attendance-report-immediate';

const testData = {
  grade: "A",
  date: "2026-01-22",
  attendanceDetails: [
    { id: "student1", name: "John Doe", status: "Present" },
    { id: "student2", name: "Jane Smith", status: "Absent" },
    { id: "student3", name: "Bob Wilson", status: "Absent with apology" }
  ],
  present: 1,
  absent: 1,
  apologyAbsent: 1,
  percentage: 33,
  total: 3
};

console.log('🧪 Testing Attendance Report Endpoint\n');
console.log('📍 Endpoint:', API_URL);
console.log('📦 Request Data:', JSON.stringify(testData, null, 2));
console.log('\n⏳ Sending request...\n');

try {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(testData)
  });

  const responseData = await response.json();
  
  console.log('📨 Response Status:', response.status);
  console.log('✅ Response:', JSON.stringify(responseData, null, 2));
  
  if (response.ok) {
    console.log('\n🎉 Success! Endpoint is working correctly.');
  } else {
    console.log('\n❌ Error:', responseData.message);
  }
} catch (error) {
  console.error('❌ Connection Error:', error.message);
  console.log('\n💡 Make sure the backend server is running on port 4000');
}
