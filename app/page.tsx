"use client"
import { Progress } from '@/components/ui/progress'
import { Check, X, RefreshCcw, SettingsIcon, Maximize2, Mic, Power, Copy } from 'lucide-react'
import React, { useState } from 'react'
import Image from 'next/image'
import imageThingy from "../public/Container.png"
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Slider } from '@/components/ui/slider'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useRouter } from 'next/navigation'

const Home = () => {
  const [activePanel, setActivePanel] = useState<'tinyChat' | 'settings' | null>(null);
  const [gpuPowerLimit, setGpuPowerLimit] = useState(250); 
  const [tempGpuPowerLimit, setTempGpuPowerLimit] = useState(250); 
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  }

  const toggleTinyChat = () => {
    setActivePanel(activePanel === 'tinyChat' ? null : 'tinyChat');
  };

  const toggleSettings = () => {
    setActivePanel(activePanel === 'settings' ? null : 'settings');
  };

  const handleSliderChange = (value: number[]) => {
    setTempGpuPowerLimit(value[0]);
  };

  const handleSave = () => {
    setGpuPowerLimit(tempGpuPowerLimit);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setIsLoading(true);
    
   
    setTimeout(() => {
      setIsRefreshing(false);
      setIsLoading(false);
    }, 2000);
  };

 
  const RoboticLoader = () => (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center">
      <div className="relative">
        <div className="w-24 h-16 bg-[#01FF7A] rounded-t-full flex items-center justify-center">
          <div className="flex space-x-4">
            <div className="w-4 h-4 bg-black rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
            <div className="w-4 h-4 bg-black rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></div>
          </div>
        </div>
        <div className="w-32 h-20 bg-[#1A1A1A] rounded-b-lg border-t-4 border-[#01FF7A] flex items-center justify-center">
          <div className="flex space-x-1 items-end h-8">
            <div className="w-2 bg-[#01FF7A] animate-loading-bar" style={{ height: '20%', animationDelay: '0ms' }}></div>
            <div className="w-2 bg-[#01FF7A] animate-loading-bar" style={{ height: '40%', animationDelay: '100ms' }}></div>
            <div className="w-2 bg-[#01FF7A] animate-loading-bar" style={{ height: '60%', animationDelay: '200ms' }}></div>
            <div className="w-2 bg-[#01FF7A] animate-loading-bar" style={{ height: '80%', animationDelay: '300ms' }}></div>
            <div className="w-2 bg-[#01FF7A] animate-loading-bar" style={{ height: '100%', animationDelay: '400ms' }}></div>
          </div>
        </div>
      </div>
      <p className="mt-8 text-[#01FF7A] font-mono animate-pulse">SYSTEM REFRESHING...</p>
    </div>
  );

  return (
    <section className='bg-[rgb(19,19,19)] min-h-screen w-full pt-5 text-white pb-6 relative'>
      {isLoading && <RoboticLoader />}
      
      <nav className='bg-[rgb(19,19,19)] border-[#222222] border-[1px] py-3 md:py-6 w-[90%] mx-auto flex justify-between items-center rounded-lg px-3 md:px-5'>
        <h1 className='text-lg md:text-2xl italics'>WELCOME TO YOUR TINYBOX!</h1>
        <span className='flex gap-2 items-center text-sm'>
          <button onClick={handleRefresh} disabled={isRefreshing} className="p-1 bg-[#1A1A1A] text-[#01FF7A] rounded-full cursor-pointer">
            <RefreshCcw 
              size={24} 
              className={`transition-transform duration-1000 ${isRefreshing ? 'animate-spin' : ''}`}
            />
          </button>
          <button onClick={handleLogout} className='py-1 px-2 md:py-2 md:px-3 bg-[#1A1A1A] text-[#01FF7A] rounded-full cursor-pointer font-bold text-xs md:text-sm'>LOG-OUT</button>
        </span>
      </nav>
      
      <section className='w-[90%] mx-auto mt-5 md:mt-3 flex flex-col md:flex-row gap-5'>
        <div className='flex flex-col gap-5 w-full md:w-[50%] h-full'>
          <div className='bg-[rgb(19,19,19)] border-[#222222] border-[1px] rounded-lg p-3 md:p-5 flex-grow'>
            <h1 className='text-[1rem] md:text-[1.2rem]'>SYSTEM MONITOR</h1>
            <div className='flex flex-col gap-3 mt-3 md:mt-5'>
              <div>
                <p className='text-[#6E6E6E] text-sm md:text-base'>GPU: AMD Radeon RX 7900 XTX</p>
                <div className='flex items-center gap-2'>
                  <Progress className='text-[#6E6E6E] flex-grow' value={44} />
                  <p className='text-[#01FF7A] text-sm md:text-base'>44%</p>
                </div>
              </div>
              <div>
                <p className='text-[#6E6E6E] text-sm md:text-base'>CPU: 32 core AMD EPYC</p>
                <div className='flex items-center gap-2'>
                  <Progress className='text-[#6E6E6E] flex-grow' value={35} />
                  <p className='text-[#01FF7A] text-sm md:text-base'>35%</p>
                </div>
              </div>
              <div>
                <p className='text-[#6E6E6E] text-sm md:text-base'>RAM: 128 GB</p>
                <div className='flex items-center gap-2'>
                  <Progress className='text-[#6E6E6E] flex-grow' value={56} />
                  <p className='text-[#01FF7A] text-sm md:text-base'>56%</p>
                </div>
              </div>
              <div className='flex flex-col items-start gap-1 md:gap-2'>
                <p className='text-[#6E6E6E] text-sm md:text-base'>System temperature</p>
                <p className='text-[#F1F1F1] text-sm md:text-base'>40℃</p>
              </div>
              <div className='flex flex-col items-start gap-1 md:gap-2'>
                <p className='text-[#6E6E6E] text-sm md:text-base'>GPU Power Limit</p>
                <div className='flex items-center justify-between w-full'>
                  <p className='text-[#F1F1F1] text-sm md:text-base'>{gpuPowerLimit}W</p>
                  <Dialog>
                    <DialogTrigger>
                      <button className='rounded-full text-[#01FF7A] px-3 py-1 md:px-5 bg-[#1A1A1A] cursor-pointer text-xs'>EDIT</button>
                    </DialogTrigger>
                    <DialogContent className='bg-[rgb(19,19,19)]'>
                      <DialogTitle className='text-[#6E6E6E]'>GPU Power Limit</DialogTitle>
                      <div className='flex items-center justify-between'>
                        <p className='text-white'>{tempGpuPowerLimit}W</p>
                        <DialogClose>
                        <button 
                          className='rounded-full text-[#01FF7A] px-3 py-1 md:px-5 bg-[#1A1A1A] cursor-pointer text-xs'
                          onClick={handleSave}
                        >
                          Save
                        </button>
                        </DialogClose>
                      </div>
                      <Slider 
                        defaultValue={[gpuPowerLimit]} 
                        value={[tempGpuPowerLimit]}
                        onValueChange={handleSliderChange}
                        min={100} 
                        max={500} 
                        step={10}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
          <div className='bg-[rgb(19,19,19)] border-[#222222] border-[1px] rounded-lg p-3 md:p-5'>
            <h1 className='text-sm md:text-base'>SETUP ASSISTANT</h1>
            <div className='mt-2 md:mt-3 flex flex-col gap-2'>
              <p className='flex gap-2 text-sm md:text-base'><span className='text-[#01FF7A]'><Check size={16}/></span>Both plugs connected</p>
              <p className='flex gap-2 text-sm md:text-base'><span className='text-[#01FF7A]'><Check size={16}/></span>Genuine circuit</p>
              <p className='flex gap-2 text-sm md:text-base'><span className='text-[#FF1919]'><X size={16}/></span>Ethernet connected</p>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-5 w-full md:w-[50%]'>
          {activePanel === 'tinyChat' ? (
            <div className='bg-[rgb(19,19,19)] border-[#222222] border-[1px] rounded-lg'>
              <aside className='h-14 md:h-20 rounded-b-[20px] border-[#222222] border-[1px] w-full flex justify-between items-center bg-[rgb(19,19,19)] p-3 md:p-5'> 
                <h1 className='text-sm md:text-base'>TINYCHAT</h1>
                <div className='flex gap-2 items-center'>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                    <SettingsIcon size={31} className='text-[#01FF7A] cursor-pointer rounded-full p-1 md:p-2 bg-[#1A1A1A]'/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='text-[#6E6E6E]'>
                      <DropdownMenuItem>
                        Refresh
                      </DropdownMenuItem>
                      <DropdownMenuSeparator/>
                      <DropdownMenuItem className='flex items-center gap-2'>
                        Copy API <Copy className='text-[#01FF7A] cursor-pointer' size={16}/>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Maximize2 size={16} className='text-[#01FF7A] cursor-pointer' onClick={toggleTinyChat}/>
                </div>
              </aside>
              <div className='p-3 md:p-5 flex flex-col justify-center items-center'>
                <Image src={imageThingy} alt='image thingy' className='object-cover' height={200} width={250}/>
              </div>
              <aside className='h-14 md:h-20 rounded-t-[20px] border-[#222222] border-[1px] w-full flex justify-between items-center bg-[rgb(19,19,19)] p-3 md:p-5'> 
                <input className='w-[70%] bg-[#1A1A1A] h-8 md:h-10 placeholder:text-[#454545] px-3 md:px-4 rounded-full text-sm md:text-base' type="text" placeholder='Ask anything' />
                <div className=''>
                  <Mic className='text-[#01FF7A] cursor-pointer' size={18}/>
                </div>
              </aside>
            </div>
          ) : (
            <aside 
              className='h-14 md:h-20 rounded-[20px] border-[#222222] border-[1px] w-full flex justify-between items-center bg-[rgb(19,19,19)] p-3 md:p-5 cursor-pointer'
              onClick={toggleTinyChat}
            > 
              <h1 className='text-sm md:text-base'>TINYCHAT</h1>
              <div className='flex gap-2 items-center'>
                <SettingsIcon size={31} className='text-[#01FF7A] cursor-pointer rounded-full p-1 md:p-2 bg-[#1A1A1A]'/>
                <Maximize2 size={16} className='text-[#01FF7A] cursor-pointer'/>
              </div>
            </aside>
          )}
          
          {activePanel === 'settings' ? (
            <div className='bg-[rgb(19,19,19)] border-[#222222] border-[1px] rounded-lg'>
              <aside className='h-14 md:h-20 rounded-b-[20px] border-[#222222] border-[1px] w-full flex justify-between items-center bg-[rgb(19,19,19)] p-3 md:p-5'> 
                <h1 className='text-sm md:text-base'>SETTINGS</h1>
                <Maximize2 size={16} className='text-[#01FF7A] cursor-pointer' onClick={toggleSettings}/>
              </aside>
              <div className='p-3 md:p-5 flex flex-col'>
                <h1 className='text-[1rem] md:text-[1.3rem] text-start'>ABOUT TINYBOX</h1>
                <ul className='text-xs text-[#6E6E6E] list-disc pl-4'>
                  <li className='mt-2 md:mt-3'>FP16 (FP32 acc) FLOPS - 738FLOPS</li>
                  <li className='mt-2 md:mt-3'>GPU Model - 6x 7900XTX6x</li>
                  <li className='mt-2 md:mt-3'>GPU RAM - 144 G</li>
                  <li className='mt-2 md:mt-3'>GPU RAM bandwidth- 5760 GB/s</li>
                  <li className='mt-2 md:mt-3'>GPU link bandwidth - full fabric PCIe 4.0 x16</li>
                  <li className='mt-2 md:mt-3'>CPU - 32 core AMD EPYC</li>
                  <li className='mt-2 md:mt-3'>System RAM - 128 GB</li>
                </ul>
                <button className='rounded-full text-[#01FF7A] px-3 py-1 md:px-5 bg-[#1A1A1A] cursor-pointer w-fit text-xs my-2 md:my-3'>SEE MORE</button>
                <div>
                  <h1 className='text-[1rem] md:text-[1.3rem] text-start'>ADVANCED SETTINGS</h1>
                  <div className='flex justify-between text-[#6E6E6E] my-2 md:my-3 text-xs md:text-sm items-center'>
                    <p>BMC SETTINGS</p>
                    <button className='rounded-full text-[#01FF7A] px-3 py-1 bg-[#1A1A1A] cursor-pointer text-xs'>EDIT</button>
                  </div>
                  <div className='flex justify-between text-[#6E6E6E] text-xs md:text-sm items-center'>
                    <p>SSH KEY PASSWORD MANAGEMENT</p>
                    <button className='rounded-full text-[#01FF7A] px-3 py-1 bg-[#1A1A1A] cursor-pointer text-xs'>EDIT</button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <aside 
              className='h-14 md:h-20 rounded-[20px] border-[#222222] border-[1px] w-full flex justify-between items-center bg-[rgb(19,19,19)] p-3 md:p-5 cursor-pointer'
              onClick={toggleSettings}
            > 
              <h1 className='text-sm md:text-base'>SETTINGS</h1>
              <Maximize2 size={16} className='text-[#01FF7A] cursor-pointer'/>
            </aside>
          )}
          
          <section className='bg-[#1A1A1A] flex justify-between items-center p-3 md:p-4 rounded-[20px] border-[#222222] border-[1px]'>
            <div className='flex cursor-pointer gap-2 items-center mx-auto border-r-[2px] md:border-r-[3px] border-[#222222] pr-8 md:pr-28'>
                <RefreshCcw size={16} className='text-[#6E6E6E] cursor-pointer'/>
              <h1 className='text-[#01FF7A] text-xs md:text-sm'>RESTART</h1>
            </div>
            <div className='flex cursor-pointer gap-2 items-center mx-auto'>
                <Power size={16} className='text-[#6E6E6E] cursor-pointer'/>
              <h1 className='text-[#01FF7A] text-xs md:text-sm'>SHUT-DOWN</h1>
            </div>
          </section>
        </div>
      </section>
    </section>
  )
}

export default Home
