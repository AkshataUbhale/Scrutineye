import React, { useState } from 'react';
import { ArrowLeft, Eye, Flag, FileText, User, Calendar, Package, AlertTriangle, CheckCircle, XCircle, ZoomIn as Zoom, Download, Share, MessageSquare } from 'lucide-react';

interface CaseFileProps {
  caseData: any;
  onBack: () => void;
  onSellerSelect: (sellerData: any) => void;
}

const CaseFile: React.FC<CaseFileProps> = ({ caseData, onBack, onSellerSelect }) => {
  const [activeTab, setActiveTab] = useState<'evidence' | 'history' | 'analysis'>('evidence');
  const [selectedText, setSelectedText] = useState<string>('');
  const [workflowStep, setWorkflowStep] = useState<'review' | 'flag' | 'escalate' | 'notice'>('review');

  // Mock evidence data
  const extractedData = {
    mrp: { value: '₹2,499', confidence: 0.95, location: { x: 340, y: 120, w: 80, h: 25 } },
    netQuantity: { value: '500g', confidence: 0.88, location: { x: 280, y: 180, w: 60, h: 20 } },
    countryOfOrigin: { value: 'Made in China', confidence: 0.92, location: { x: 200, y: 380, w: 120, h: 18 } },
    manufacturer: { value: 'TechCorp Industries', confidence: 0.89, location: { x: 150, y: 420, w: 200, h: 22 } }
  };

  const handleTextHover = (field: string) => {
    setSelectedText(field);
  };

  const getWorkflowStepStatus = (step: string) => {
    const steps = ['review', 'flag', 'escalate', 'notice'];
    const currentIndex = steps.indexOf(workflowStep);
    const stepIndex = steps.indexOf(step);
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'pending';
  };

  const tabs = [
    { id: 'evidence', label: 'Evidence Viewer', icon: Eye },
    { id: 'history', label: 'Case History', icon: FileText },
    { id: 'analysis', label: 'AI Analysis', icon: AlertTriangle }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          
          <div>
            <h1 className="text-2xl font-bold text-navy-800">
              Case File: {caseData?.id}
            </h1>
            <p className="text-slate-600">{caseData?.title}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-navy-700 hover:bg-slate-50 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            <span className="text-sm">Export Evidence</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-navy-700 hover:bg-slate-50 rounded-lg transition-colors">
            <Share className="w-4 h-4" />
            <span className="text-sm">Share Case</span>
          </button>
        </div>
      </div>

      {/* Case Summary Card */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-slate-500 mb-1">Severity</p>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <span className="font-semibold text-red-600">{caseData?.severity}</span>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-slate-500 mb-1">Priority Score</p>
            <div className="flex items-center space-x-2">
              <div className="w-16 bg-slate-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: `${caseData?.priority}%` }}></div>
              </div>
              <span className="font-semibold text-navy-800">{caseData?.priority}/100</span>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-slate-500 mb-1">Seller</p>
            <button 
              onClick={() => onSellerSelect({ name: caseData?.seller, id: 'seller-1' })}
              className="font-semibold text-navy-700 hover:text-navy-800 hover:underline transition-colors"
            >
              {caseData?.seller}
            </button>
          </div>
          
          <div>
            <p className="text-sm text-slate-500 mb-1">Detection Time</p>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-slate-500" />
              <span className="font-semibold text-slate-700">{caseData?.timeDetected}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Workflow Progress */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
        <h3 className="font-semibold text-navy-800 mb-4">Investigation Workflow</h3>
        
        <div className="flex items-center justify-between">
          {[
            { step: 'review', label: 'Log Evidence', icon: Eye },
            { step: 'flag', label: 'Flag for Review', icon: Flag },
            { step: 'escalate', label: 'Escalate to Legal', icon: AlertTriangle },
            { step: 'notice', label: 'Issue Notice', icon: FileText }
          ].map((item, index) => {
            const status = getWorkflowStepStatus(item.step);
            const Icon = item.icon;
            
            return (
              <div key={item.step} className="flex items-center">
                <button
                  onClick={() => setWorkflowStep(item.step as any)}
                  className={`flex flex-col items-center p-4 rounded-lg transition-all ${
                    status === 'completed' 
                      ? 'bg-green-50 text-green-700' 
                      : status === 'active'
                      ? 'bg-navy-50 text-navy-700 border-2 border-navy-200'
                      : 'bg-slate-50 text-slate-500'
                  }`}
                >
                  <Icon className="w-5 h-5 mb-2" />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
                
                {index < 3 && (
                  <div className={`h-0.5 w-16 mx-2 ${
                    getWorkflowStepStatus(['review', 'flag', 'escalate', 'notice'][index + 1]) === 'completed' 
                      ? 'bg-green-400' 
                      : 'bg-slate-200'
                  }`}></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200">
        <div className="border-b border-slate-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-navy-500 text-navy-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Evidence Viewer Tab */}
        {activeTab === 'evidence' && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-96">
              {/* Left Pane - Product Image */}
              <div className="relative bg-slate-50 rounded-lg border-2 border-dashed border-slate-300 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Package className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600 mb-2">Product Listing Image</p>
                    <p className="text-xs text-slate-500">High-resolution, zoomable evidence viewer</p>
                  </div>
                </div>

                {/* Overlay highlights for extracted data */}
                {selectedText && extractedData[selectedText as keyof typeof extractedData] && (
                  <div 
                    className="absolute border-2 border-blue-500 bg-blue-200 bg-opacity-30 animate-pulse"
                    style={{
                      left: extractedData[selectedText as keyof typeof extractedData].location.x,
                      top: extractedData[selectedText as keyof typeof extractedData].location.y,
                      width: extractedData[selectedText as keyof typeof extractedData].location.w,
                      height: extractedData[selectedText as keyof typeof extractedData].location.h
                    }}
                  ></div>
                )}

                {/* Zoom Controls */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="p-2 bg-white rounded shadow hover:bg-slate-50 transition-colors">
                    <Zoom className="w-4 h-4 text-slate-600" />
                  </button>
                </div>
              </div>

              {/* Right Pane - Extracted Analysis */}
              <div className="bg-white border border-slate-200 rounded-lg p-4">
                <h4 className="font-semibold text-navy-800 mb-4">AI-Extracted Information</h4>
                
                <div className="space-y-4">
                  {Object.entries(extractedData).map(([field, data]) => (
                    <div 
                      key={field}
                      className={`p-3 rounded-lg border-l-4 cursor-pointer transition-all ${
                        selectedText === field 
                          ? 'bg-blue-50 border-l-blue-500' 
                          : 'bg-slate-50 border-l-slate-300 hover:bg-slate-100'
                      }`}
                      onMouseEnter={() => handleTextHover(field)}
                      onMouseLeave={() => setSelectedText('')}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-slate-700 capitalize">
                          {field.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </p>
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${
                            data.confidence > 0.9 ? 'bg-green-400' : 
                            data.confidence > 0.8 ? 'bg-amber-400' : 'bg-red-400'
                          }`}></div>
                          <span className="text-xs text-slate-500">{Math.round(data.confidence * 100)}%</span>
                        </div>
                      </div>
                      
                      <p className="font-semibold text-navy-800 mb-1">{data.value}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500">
                          Location: {data.location.x}, {data.location.y}
                        </span>
                        {field === 'mrp' && (
                          <span className="text-xs text-red-600 font-medium">VIOLATION DETECTED</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Panel */}
                <div className="mt-6 pt-4 border-t border-slate-200">
                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Mark Valid</span>
                    </button>
                    
                    <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors">
                      <XCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Flag Violation</span>
                    </button>
                  </div>
                  
                  <button className="w-full mt-3 flex items-center justify-center space-x-2 px-4 py-2 bg-navy-700 text-white rounded-lg hover:bg-navy-800 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-sm font-medium">Add Investigation Notes</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs content */}
        {activeTab !== 'evidence' && (
          <div className="p-6">
            <div className="text-center py-12">
              <p className="text-slate-500">
                {activeTab === 'history' ? 'Case History' : 'AI Analysis'} content would be displayed here
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseFile;