#!/usr/bin/env node

/**
 * Backend Route Debugging Script
 * Use this to check if backend is running and routes are registered
 */

import http from 'http';

const BASE_URL = 'http://localhost:4000';

async function makeRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
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
            data: JSON.parse(body)
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: body
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

async function runDiagnostics() {
  console.log('🔍 Backend Route Diagnostics\n');
  console.log('═'.repeat(60));

  // Test 1: Health
  console.log('\n1️⃣  Checking if backend is running...\n');
  try {
    const health = await makeRequest('/health');
    console.log('✅ Backend is running on port 4000');
    console.log('   Status:', health.data.status);
    console.log('   Environment:', health.data.environment);
  } catch (error) {
    console.error('❌ Backend is NOT running!');
    console.error('   Error:', error.message);
    console.log('\n📝 To start backend:');
    console.log('   cd backend');
    console.log('   npm run dev\n');
    process.exit(1);
  }

  // Test 2: Check registered routes
  console.log('\n2️⃣  Checking registered routes...\n');
  try {
    const routes = await makeRequest('/debug/routes');
    console.log('✅ Found', routes.data.totalRoutes, 'routes');
    
    // Filter for student routes
    const studentRoutes = routes.data.routes.filter(r => 
      r.path.includes('student')
    );
    
    if (studentRoutes.length > 0) {
      console.log('\n   📍 Student Routes:');
      studentRoutes.forEach(route => {
        console.log(`      ${route.methods.join(', ').toUpperCase()} ${route.path}`);
      });
    }
    
    // Check for register route specifically
    const registerRoute = routes.data.routes.find(r =>
      r.path.includes('register') && r.methods.includes('post')
    );
    
    if (registerRoute) {
      console.log('\n   ✅ Register route found!');
    } else {
      console.log('\n   ⚠️  Register route NOT found in routes list');
      console.log('   Check that studentRouter is properly imported');
    }
  } catch (error) {
    console.error('❌ Could not fetch routes:', error.message);
  }

  // Test 3: Test actual registration endpoint
  console.log('\n3️⃣  Testing registration endpoint...\n');
  try {
    const testEmail = `test-${Date.now()}@test.com`;
    const response = await makeRequest('/api/v1/students/register', 'POST', {
      name: 'Test User',
      registrationNumber: 'TEST001',
      class: '10-A',
      email: testEmail,
      password: 'test123456',
      confirmPassword: 'test123456'
    });

    if (response.status === 201) {
      console.log('✅ Registration endpoint works!');
      console.log('   Status: 201 Created');
      console.log('   Response:', response.data.message);
    } else if (response.status === 404) {
      console.log('❌ Registration endpoint not found (404)');
      console.log('   This means the route is not registered');
      console.log('\n   Possible causes:');
      console.log('   1. Backend not restarted after code changes');
      console.log('   2. studentRouter not properly imported in app.js');
      console.log('   3. Route not properly mounted');
    } else {
      console.log('⚠️  Unexpected response:');
      console.log('   Status:', response.status);
      console.log('   Message:', response.data.message);
    }
  } catch (error) {
    console.error('❌ Could not test endpoint:', error.message);
  }

  console.log('\n' + '═'.repeat(60));
  console.log('\n📋 Diagnostics Complete\n');
}

// Run diagnostics
runDiagnostics().catch(console.error);
