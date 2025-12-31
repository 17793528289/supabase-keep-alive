const { createClient } = require('@supabase/supabase-js');

// 从GitHub的Secrets中获取配置
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function keepAlive() {
  console.log('开始执行Supabase保活任务...');
  
  try {
    // 方法1：尝试列出存储桶（即使没有存储桶也会产生网络请求）
    const { data: buckets, error: storageError } = await supabase.storage.listBuckets();
    
    if (storageError) {
      console.log('Storage API调用完成（产生网络活动）');
    } else {
      console.log(`Storage API调用成功，当前Buckets数量: ${buckets.length}`);
    }
    
    console.log('Supabase保活任务执行完毕！');
  } catch (err) {
    console.error('执行出错：', err.message);
  }
}

keepAlive();
