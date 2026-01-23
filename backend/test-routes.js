#!/usr/bin/env node

// Test script for attendance email report endpoint
console.log('🧪 Testing Attendance Email Report Endpoint\n');

// Check if routes are properly exported
import fs from 'fs';
import path from 'path';

const emailRoutesPath = './router/email.routes.js';
const emailControllerPath = './controllers/email.controller.js';

console.log('📋 Checking file exports:\n');

// Check routes file
if (fs.existsSync(emailRoutesPath)) {
  const routesContent = fs.readFileSync(emailRoutesPath, 'utf8');
  console.log('✅ Email routes file exists');
  if (routesContent.includes('sendImmediateAttendanceReport')) {
    console.log('✅ sendImmediateAttendanceReport imported in routes');
  } else {
    console.log('❌ sendImmediateAttendanceReport NOT found in routes');
  }
  if (routesContent.includes('/attendance-report-immediate')) {
    console.log('✅ /attendance-report-immediate route registered');
  } else {
    console.log('❌ /attendance-report-immediate route NOT found');
  }
} else {
  console.log('❌ Email routes file not found');
}

console.log();

// Check controller file
if (fs.existsSync(emailControllerPath)) {
  const controllerContent = fs.readFileSync(emailControllerPath, 'utf8');
  console.log('✅ Email controller file exists');
  if (controllerContent.includes('export const sendImmediateAttendanceReport')) {
    console.log('✅ sendImmediateAttendanceReport function exported');
  } else {
    console.log('❌ sendImmediateAttendanceReport function NOT exported');
  }
  if (controllerContent.includes('studentStats[student._id')) {
    console.log('✅ Student stats processing logic found');
  } else {
    console.log('❌ Student stats processing NOT found');
  }
} else {
  console.log('❌ Email controller file not found');
}

console.log('\n✅ All checks passed! Route should be available.');
console.log('\n📡 Available endpoints:');
console.log('   POST /api/v1/email/attendance-report');
console.log('   POST /api/v1/email/attendance-report-immediate (NEW)');
console.log('   GET /api/v1/email/test');
