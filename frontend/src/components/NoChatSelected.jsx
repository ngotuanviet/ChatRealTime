import { MessageSquare } from 'lucide-react'


function NoChatSelected() {
    return (
        <div className='w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/5'>
            <div className='max-w-md text-center space-y-6'>
                {/* Icon */}
                <div className=' flex justify-center gap-4 mb-4'>
                    <div className='relative'>
                        <div className='w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce'>
                            <MessageSquare className='w-8 h-8 text-primary' />
                        </div>
                    </div>
                </div>

                {/* Wecome */}
                <h2 className='text-2xl font-bold'>Chào mừng đã đến với ChatRealTime</h2>
                <p className='text-base-content/60'>
                    Khám phá những tiện ích hỗ trợ làm việc và trò chuyện cùng người thân, bạn bè được tối ưu hoá trên máy tính của bạn
                </p>
            </div>

        </div>
    )
}

export default NoChatSelected
