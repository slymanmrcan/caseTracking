'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Create() {
  const [caseTitle, setCaseTitle] = useState("");
  const [caseStartDate, setCaseStartDate] = useState("");
  const [courtName, setCourtName] = useState("");
  const [caseStatus, setCaseStatus] = useState("");
  const [lawyer, setLawyer] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Token'ı localStorage'dan alıyoruz
      const token = localStorage.getItem('token');
      
      // API isteği için body oluşturuyoruz
      const caseData = {
        caseTitle,
        caseStartDate,
        courtName,
        caseStatus,
        lawyer,
        documents: []
      };
      
      const response = await fetch("https:api.suleymanmercan.com/api/Case", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(caseData) // Body'yi JSON olarak gönderiyoruz
      });
      
      if (response.ok) {
        // Başarılı olursa ana sayfaya yönlendiriyoruz
        router.push("/cases");
        router.refresh(); // Verileri yenilemek için
      } else {
        // Hata durumunda işleyin
        const errorData = await response.text();
        console.error("API error:", errorData);
        alert("Dava oluşturulurken bir hata oluştu.");
      }
    } catch (error) {
      console.error("Error creating case:", error);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Yeni Dava Oluştur</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <div className="flex flex-col">
          <label className="mb-1 font-medium">
            Dava Başlığı
          </label>
          <input
            type="text"
            value={caseTitle}
            onChange={(e) => setCaseTitle(e.target.value)}
            className="border border-gray-300 p-2 rounded"
            required
          />
        </div>
        
        <div className="flex flex-col">
          <label className="mb-1 font-medium">
            Başlangıç Tarihi
          </label>
          <input
            type="date"
            value={caseStartDate}
            onChange={(e) => setCaseStartDate(e.target.value)}
            className="border border-gray-300 p-2 rounded"
            required
          />
        </div>
        
        <div className="flex flex-col">
          <label className="mb-1 font-medium">
            Mahkeme Adı
          </label>
          <input
            type="text"
            value={courtName}
            onChange={(e) => setCourtName(e.target.value)}
            className="border border-gray-300 p-2 rounded"
            required
          />
        </div>
        
        <div className="flex flex-col">
          <label className="mb-1 font-medium">
            Dava Durumu
          </label>
          <select
            value={caseStatus}
            onChange={(e) => setCaseStatus(e.target.value)}
            className="border border-gray-300 p-2 rounded"
            required
          >
            <option value="">Seçiniz</option>
            <option value="Ongoing">Devam Ediyor</option>
            <option value="Completed">Tamamlandı</option>
            <option value="Pending">Beklemede</option>
          </select>
        </div>
        
        <div className="flex flex-col">
          <label className="mb-1 font-medium">
            Avukat
          </label>
          <input
            type="text"
            value={lawyer}
            onChange={(e) => setLawyer(e.target.value)}
            className="border border-gray-300 p-2 rounded"
            required
          />
        </div>
        
        <div className="flex gap-4 pt-4">
          <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
          >
            Dava Oluştur
          </button>
          <button 
            type="button" 
            onClick={() => router.back()}
            className="bg-gray-300 hover:bg-gray-400 px-6 py-2 rounded"
          >
            İptal
          </button>
        </div>
      </form>
    </div>
  );
}