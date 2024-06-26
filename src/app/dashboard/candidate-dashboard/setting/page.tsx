'use client'
import React,{useEffect, useState} from 'react';
import Wrapper from "@/layouts/wrapper";
import CandidateAside from "@/app/components/dashboard/candidate/aside";
import DashboardSettingArea from "@/app/components/dashboard/candidate/dashboard-setting";
import { useRouter } from 'next/navigation';
import { getRole } from '@/hooks/client-request/getRole';

const CandidateDashboardSettingPage = () => {
  const [isOpenSidebar,setIsOpenSidebar] = useState<boolean>(false);
  const router= useRouter();
  useEffect(() => {
    async function verfiyRole(){
      const role = await getRole();
      if (!role) {
        router.push('/register');
      }else if( role ==='user'){
        router.push('/confirm-role');
      }else if( role !=='candidate'){
        router.push('/');
      }
     }
     verfiyRole()
    },[])
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* aside start */}
        <CandidateAside isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar} />
        {/* aside end  */}

        {/* setting area start */}
        <DashboardSettingArea setIsOpenSidebar={setIsOpenSidebar} />
        {/* setting area end */}
      </div>
    </Wrapper>
  );
};

export default CandidateDashboardSettingPage;
