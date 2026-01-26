#!/usr/bin/env node

/**
 * Test script for Personalized Attendance Report Email
 * Tests the new sendStudentAttendanceReport endpoint
 */

import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:4000/api/email';

console.log('🧪 Testing Personalized Attendance Report Email\n');
console.log('=' .repeat(60));

// Test 1: Send attendance report for a specific student
async function testSendStudentAttendanceReport() {
  console.log('\n📧 Test 1: Send Personalized Attendance Report');
  console.log('-' .repeat(60));
  
  const payload = {
    rollNumber: 'REG001',
    startDate: '2024-01-01',
    endDate: '2024-01-31'
  };
  
  console.log('📤 Payload:', JSON.stringify(payload, null, 2));
  
  try {
    const response = await fetch(`${BASE_URL}/student-attendance-report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    const data = await response.json();
    
    console.log('\n✅ Response Status:', response.status);
    console.log('📨 Response Data:');
    console.log(JSON.stringify(data, null, 2));
    
    if (data.success) {
      console.log('\n✅ TEST PASSED');
      console.log(`   - Emails sent: ${data.results.successful}/${data.results.successful + data.results.failed}`);
      console.log(`   - Student: ${data.stats.studentName}`);
      console.log(`   - Attendance: ${data.stats.attendancePercentage}%`);
    } else {
      console.log('\n❌ TEST FAILED');
      console.log(`   - Error: ${data.message}`);
    }
  } catch (error) {
    console.error('\n❌ TEST FAILED WITH ERROR:');
    console.error(`   ${error.message}`);
  }
}

// Test 2: Send attendance report without date range (should use current month)
async function testSendStudentAttendanceReportWithoutDates() {
  console.log('\n\n📧 Test 2: Send Attendance Report (Auto Date Range)');
  console.log('-' .repeat(60));
  
  const payload = {
    rollNumber: 'REG002'
  };
  
  console.log('📤 Payload:', JSON.stringify(payload, null, 2));
  console.log('   (Dates will default to current month)');
  
  try {
    const response = await fetch(`${BASE_URL}/student-attendance-report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    const data = await response.json();
    
    console.log('\n✅ Response Status:', response.status);
    console.log('📨 Response Data:');
    console.log(JSON.stringify(data, null, 2));
    
    if (data.success) {
      console.log('\n✅ TEST PASSED');
      console.log(`   - Emails sent: ${data.results.successful}/${data.results.successful + data.results.failed}`);
      console.log(`   - Student: ${data.stats.studentName}`);
      console.log(`   - Attendance: ${data.stats.attendancePercentage}%`);
    } else {
      console.log('\n❌ TEST FAILED');
      console.log(`   - Error: ${data.message}`);
    }
  } catch (error) {
    console.error('\n❌ TEST FAILED WITH ERROR:');
    console.error(`   ${error.message}`);
  }
}

// Test 3: Send with invalid roll number
async function testSendStudentAttendanceReportInvalidRoll() {
  console.log('\n\n📧 Test 3: Send Attendance Report (Invalid Roll Number)');
  console.log('-' .repeat(60));
  
  const payload = {
    rollNumber: 'INVALID123'
  };
  
  console.log('📤 Payload:', JSON.stringify(payload, null, 2));
  console.log('   (Should return 404 error)');
  
  try {
    const response = await fetch(`${BASE_URL}/student-attendance-report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    const data = await response.json();
    
    console.log('\n✅ Response Status:', response.status);
    console.log('📨 Response Data:');
    console.log(JSON.stringify(data, null, 2));
    
    if (!data.success && response.status === 404) {
      console.log('\n✅ TEST PASSED');
      console.log(`   - Error correctly returned: ${data.message}`);
    } else {
      console.log('\n❌ TEST FAILED');
      console.log(`   - Expected 404 error for invalid roll number`);
    }
  } catch (error) {
    console.error('\n❌ TEST FAILED WITH ERROR:');
    console.error(`   ${error.message}`);
  }
}

// Test 4: Send with missing roll number
async function testSendStudentAttendanceReportMissingRoll() {
  console.log('\n\n📧 Test 4: Send Attendance Report (Missing Roll Number)');
  console.log('-' .repeat(60));
  
  const payload = {
    startDate: '2024-01-01',
    endDate: '2024-01-31'
  };
  
  console.log('📤 Payload:', JSON.stringify(payload, null, 2));
  console.log('   (Should return 400 error for missing rollNumber)');
  
  try {
    const response = await fetch(`${BASE_URL}/student-attendance-report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    const data = await response.json();
    
    console.log('\n✅ Response Status:', response.status);
    console.log('📨 Response Data:');
    console.log(JSON.stringify(data, null, 2));
    
    if (!data.success && response.status === 400) {
      console.log('\n✅ TEST PASSED');
      console.log(`   - Error correctly returned: ${data.message}`);
    } else {
      console.log('\n❌ TEST FAILED');
      console.log(`   - Expected 400 error for missing roll number`);
    }
  } catch (error) {
    console.error('\n❌ TEST FAILED WITH ERROR:');
    console.error(`   ${error.message}`);
  }
}

// Run all tests
async function runAllTests() {
  console.log('🚀 Starting Test Suite\n');
  
  // Check if server is running
  try {
    const healthCheck = await fetch(`${BASE_URL}/test`);
    if (!healthCheck.ok) {
      console.error('❌ Server is not responding correctly');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Could not connect to server at', BASE_URL);
    console.error('   Make sure the backend is running on port 4000');
    console.error('   Error:', error.message);
    process.exit(1);
  }
  
  await testSendStudentAttendanceReport();
  await testSendStudentAttendanceReportWithoutDates();
  await testSendStudentAttendanceReportInvalidRoll();
  await testSendStudentAttendanceReportMissingRoll();
  
  console.log('\n' + '=' .repeat(60));
  console.log('✅ Test Suite Complete\n');
}

// Run tests
runAllTests().catch(error => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});
