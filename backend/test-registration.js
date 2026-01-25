#!/usr/bin/env node

/**
 * Quick Test Script - Test Student Registration Endpoint
 * Run this after backend is running to verify routes are working
 * Usage: npm run test-register
 */

import http from 'http';

const API_BASE = 'http://localhost:4000';

function makeRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, API_BASE);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            data: JSON.parse(body),
            headers: res.headers
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: body,
            headers: res.headers
          });
        }
      });
    });

    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function testRegistration() {
  console.log('🧪 Testing Student Registration API\n');
  
  const testData = {
    name: 'Test Student',
    registrationNumber: 'TEST' + Date.now(),
    class: '10-A',
    email: `test-${Date.now()}@school.com`,
    password: 'test123456',
    confirmPassword: 'test123456'
  };

  console.log('📝 Test Data:');
  console.log(JSON.stringify(testData, null, 2));
  console.log('\n⏳ Sending request to:', `${API_BASE}/api/v1/students/register\n`);

  try {
    const response = await makeRequest('/api/v1/students/register', 'POST', testData);
    
    if (response.status === 201) {
      console.log('✅ SUCCESS (201 Created)');
      console.log('\nResponse:');
      console.log(JSON.stringify(response.data, null, 2));
      
      if (response.data.success) {
        console.log('\n✨ Registration successful!');
        console.log('Student Email:', response.data.student.email);
      }
    } else if (response.status === 404) {
      console.log('❌ ERROR: Route not found (404)');
      console.log('Make sure backend is running: npm run dev');
    } else {
      console.log('⚠️  Status:', response.status);
      console.log('Response:', response.data);
    }
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    console.log('\nMake sure backend is running!');
    console.log('Run: npm run dev');
  }
}

async function testHealth() {
  console.log('🏥 Testing Health Endpoint\n');
  
  try {
    const response = await makeRequest('/health');
    if (response.status === 200) {
      console.log('✅ Backend is healthy');
      console.log('Status:', response.data.status);
    }
  } catch (error) {
    console.error('❌ Backend not responding:', error.message);
  }
}

async function runTests() {
  console.log('═'.repeat(60) + '\n');
  
  // Test health first
  await testHealth();
  
  console.log('\n' + '═'.repeat(60) + '\n');
  
  // Test registration
  await testRegistration();
  
  console.log('\n' + '═'.repeat(60) + '\n');
}

// Run tests
runTests();

