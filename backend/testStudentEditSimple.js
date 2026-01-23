import http from 'http';

const makeRequest = (method, path, data = null) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 4000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
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
};

const runTests = async () => {
  console.log('\n🧪 Testing Student Edit API\n');
  
  try {
    // Test 1: Create a student
    console.log('Test 1: Creating student...');
    const createRes = await makeRequest('POST', '/api/v1/students', {
      name: 'Test Student Edit',
      registrationNumber: 'TSE' + Date.now(),
      class: 'A',
      email: 'test@example.com',
      parentName: 'Parent Name',
      parentEmail: 'parent@example.com',
      parentPhone: '1234567890'
    });
    
    console.log('Status:', createRes.status);
    console.log('Response:', JSON.stringify(createRes.data, null, 2));
    
    if (createRes.status !== 200 && createRes.status !== 201) {
      console.log('❌ Create failed');
      return;
    }

    const studentId = createRes.data.data?._id || createRes.data._id;
    console.log('✅ Student created:', studentId);
    
    // Test 2: Update the student
    console.log('\nTest 2: Updating student...');
    const updateRes = await makeRequest('PUT', `/api/v1/students/${studentId}`, {
      name: 'Updated Test Student',
      class: 'B',
      email: 'updated@example.com'
    });
    
    console.log('Status:', updateRes.status);
    console.log('Response:', JSON.stringify(updateRes.data, null, 2));
    
    if (updateRes.status === 200 || updateRes.status === 201) {
      console.log('✅ Student updated successfully');
    } else {
      console.log('❌ Update failed');
    }
    
    // Test 3: Get student to verify update
    console.log('\nTest 3: Verifying update...');
    const getRes = await makeRequest('GET', `/api/v1/students/getall`);
    console.log('Status:', getRes.status);
    
    const allStudents = getRes.data.data || getRes.data;
    const updated = allStudents.find(s => s._id === studentId);
    
    if (updated) {
      console.log('✅ Found updated student:', updated);
      console.log('   Name changed:', updated.name === 'Updated Test Student' ? '✅' : '❌');
      console.log('   Class changed:', updated.class === 'B' ? '✅' : '❌');
      console.log('   Email changed:', updated.email === 'updated@example.com' ? '✅' : '❌');
    } else {
      console.log('❌ Student not found after update');
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
};

runTests();
