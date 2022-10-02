import React, {useState } from 'react';

const Comment = () => {

    const [count, setCount] = useState('');

    return ( 
        <div class="antialiased mx-auto max-w-screen-sm">
            <h3 class="mb-4 text-lg font-semibold text-gray-900">Comments</h3>
            <div class="space-y-4">
              <div class="flex">
                <div class="flex-shrink-0 mr-3">
                  <img class="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10" src="" alt="" />
                </div>
                <div class="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                  <strong>monbre</strong>{" "}
                  <span class="text-xs text-gray-400">
                    hora de de que fue escrito el comentario
                  </span>
                  <p class="text-sm">{count}</p>
                </div>
              </div>
              <script src="https://cdn.tailwindcss.com/"></script>
              <div>
                <textarea onChange={(e)=> setCount(e.target.value)}
                placeholder="Add your comment..." 
                class="p-2 focus:outline-1 focus:outline-gray-500 border-[0.1px] resize-none h-[120px] border-[#9EA5B1] rounded-md w-full"></textarea>
                <div class="flex justify-end">
                  <button class="text-sm font-semibold absolute bg-[#4F46E5] w-fit text-white py-2 rounded px-3">
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
     );
}
 
export default Comment;