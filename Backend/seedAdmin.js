import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const phone = '0725847355';
    const password = 'zxcvbnmA';

    const existing = await Admin.findOne({ phone });

    if (existing) {
      console.log('⚠️ Admin already exists.');
    } else {
      await Admin.create({
        name: 'Super Admin',
        phone,
        password,
        role: 'admin',
      });

      console.log('✅ Admin user created successfully');
    }
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seedAdmin();