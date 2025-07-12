<template>
  <div class="sticky top-0 bg-neutral-900 border-b border-neutral-700">
    <CenterContainer as="header" class="px-4 py-3 gap-4 flex items-center">
      <Logo class="w-46 shrink-0" />

      <div class="flex justify-end items-center w-full gap-2 md:gap-4">
        <MainSearch class="hidden md:flex flex-1" />

        <div class="flex flex-initial items-center justify-end">
          <MainNavigation />
        </div>
      </div>
    </CenterContainer>
  </div>
</template>
