const test = () => {
  return (
    <div class="flex min-h-screen flex-col items-center bg-linear-to-b from-[#2A2F59] to-[#1C1F3A] px-4 py-6">
      <div class="flex w-full max-w-95 flex-col gap-5">
        {/* Header */}
        <div class="flex items-center justify-between">
          <h1 class="text-lg font-semibold text-white">Country Quiz</h1>

          <div class="flex items-center gap-1 rounded-full bg-linear-to-r from-[#FF6BAA] to-[#B16CEA] px-3 py-1 text-[12px] font-semibold text-white">
            🔥 4/10 Points
          </div>
        </div>

        {/* Quiz Card */}
        <div class="w-full rounded-xl bg-[#343963] p-5 shadow-[0_10px_20px_rgba(0,0,0,0.25)]">
          {/* Progress */}
          <div class="mb-5 grid grid-cols-6 gap-2.5">
            <div class="flex h-8 w-8 items-center justify-center rounded-full bg-[#F05AA6] text-[12px] font-semibold text-white">
              1
            </div>
            <div class="flex h-8 w-8 items-center justify-center rounded-full bg-[#A05AFF] text-[12px] font-semibold text-white">
              2
            </div>
            <div class="flex h-8 w-8 items-center justify-center rounded-full bg-[#3F4472] text-[12px] text-gray-400">
              3
            </div>
          </div>

          {/* Question */}
          <p class="mb-6 text-center text-[16px] font-semibold text-[#E6E9FF]">
            Which country does this flag 🇫🇮 belong to?
          </p>

          {/* Options */}
          <div class="flex flex-col gap-3">
            <button class="flex h-12 items-center justify-between rounded-xl bg-linear-to-r from-[#F05A8C] to-[#B35ADF] px-4 text-[14px] font-medium text-white">
              Sweden ❌
            </button>

            <button class="flex h-12 items-center justify-center rounded-xl bg-[#3F4472] text-[14px] text-[#E6E9FF]">
              Vietnam
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default test;
